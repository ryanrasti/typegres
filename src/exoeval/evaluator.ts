import type * as acorn from 'acorn'
import type { Control, ExpressionContext } from './expr'
import { allowedExpressions } from './allowed'
import { getControl, isPlainObject, makeControl } from './expr'
import { Scope } from './scope'
import { getTool, isExprFunction, isToolableConstructor, isToolableFunction } from './tool'
import { disallowedProperties, Invariant } from './utils'

const internal = Symbol('internal')
type InternalFn<F = (...args: any[]) => any> = F & { [internal]: acorn.Node }
const internalFn = <F extends (...args: any[]) => any>(fn: F, node: acorn.Node): InternalFn<F> => {
	Object.defineProperty(fn, internal, { value: node, configurable: true, writable: true })
	return fn as InternalFn<F>
}
const isInternalFn = (fn: unknown): fn is InternalFn => {
	return typeof fn === 'function' && (fn as any)[internal] !== undefined
}

export type EvalResult<Expr, Ret = Expr> = Generator<Control<InternalControl<Expr>> | Expr, Ret, unknown>
type InternalControl<Expr>
	= {
		control: 'await'
		value: Expr
	}
	| {
		control: 'return'
		value: Expr
	}

type BuiltinPrototypes = {
	Array?: object
	String?: object
	Number?: object
	Boolean?: object
	Date?: object
}

export class Evaluator<Expr> {
	public readonly inv: Invariant
	constructor(
		private readonly ast: acorn.Node,
		readonly code: string,
		public readonly ctx: ExpressionContext<Expr>,
		public readonly scope: Scope<Expr>,
		public readonly builtinPrototypes: BuiltinPrototypes,
	) {
		this.inv = new Invariant(code)
	}

	with({ newScope }: { newScope?: boolean }): Evaluator<Expr> {
		return new Evaluator(this.ast, this.code, this.ctx, newScope ? new Scope(this.scope) : this.scope, this.builtinPrototypes)
	}

	// eslint-disable-next-line require-yield -- generator-protocol method; callers `yield*` it
	* Identifier(node: acorn.Identifier): EvalResult<Expr> {
		if (node.name === 'undefined') {
			return this.ctx.of(undefined)
		}
		return this.scope.get(node, this)
	}

	// eslint-disable-next-line require-yield -- generator-protocol method; callers `yield*` it
	* Literal(node: acorn.Literal): EvalResult<Expr> {
		return this.ctx.of(node.value)
	}

	* ChainExpression(node: acorn.ChainExpression): EvalResult<Expr> {
		return yield* this.Expression(node.expression)
	}

	* MemberExpression(node: acorn.MemberExpression): EvalResult<Expr> {
		this.inv.parse(node.object.type !== 'Super', '`super` is not allowed', node)
		this.inv.parse(node.property.type !== 'PrivateIdentifier', 'private identifiers are not allowed', node)
		const object = yield* this.Expression(node.object)

		const property = node.property.type === 'Identifier' && !node.computed ? node.property.name : yield* this.$(node.property)
		this.inv.eval(typeof property === 'string' || typeof property === 'number', 'property is not a string or number', node, property)

		return yield* this.getExoProperty(object, property, node.property, node.optional)
	}

	* evalArray(elements: (acorn.Expression | acorn.SpreadElement | null)[]): EvalResult<Expr, Expr[]> {
		const array: Expr[] = []
		for (const element of elements) {
			if (element == null) {
				continue
			}
			if (element.type === 'SpreadElement') {
				const spread = yield* this.Expression(element.argument)
				const spreadArray = this.ctx.sequence(spread)
				this.inv.eval(Array.isArray(spreadArray), 'spread is not an array', element.argument, spreadArray)
				array.push(...spreadArray)
			}
			else {
				array.push(yield* this.Expression(element))
			}
		}
		return array
	}

	* CallExpression(node: acorn.CallExpression): EvalResult<Expr> {
		this.inv.parse(node.callee.type !== 'Super', '`super` is not allowed', node)

		const callee = yield* this.Expression(node.callee)
		const calleeRaw = yield callee
		if (calleeRaw == null && node.optional) {
			// Short-circuit: don't eval the arguments if the callee is null or undefined
			return this.ctx.of(undefined)
		}

		const args = yield* this.evalArray(node.arguments)
		if (isInternalFn(calleeRaw)) {
			return Reflect.apply(calleeRaw, undefined, args)
		}
		if (isExprFunction(calleeRaw)) {
			return Reflect.apply(calleeRaw as (...args: Expr[]) => Expr, undefined, [this.ctx, ...args])
		}
		this.inv.eval(isToolableFunction(calleeRaw), 'callee is not a toolable function', node, calleeRaw)
		return this.ctx.call(callee, args)
	}

	* ArrayExpression(node: acorn.ArrayExpression): EvalResult<Expr> {
		const array = yield* this.evalArray(node.elements)
		return this.ctx.distribute(array)
	}

	assertAllowedProperty(key: string | number, node: acorn.Node) {
		this.inv.eval(!disallowedProperties.has(String(key)), `${key} is not allowed`, node, key)
	}

	defineProperty(obj: object, key: string | number, value: unknown, node: acorn.Node) {
		this.assertAllowedProperty(key, node)
		Object.defineProperty(obj, key, { value, writable: false, enumerable: true })
	}

	* getExoProperty(obj: Expr, key: string | number, node: acorn.Node, optional: boolean): EvalResult<Expr> {
		this.assertAllowedProperty(key, node)
		const sequenced = this.ctx.sequence(obj)

		if (Array.isArray(sequenced) && typeof key === 'number') {
			return sequenced[key] as Expr
		}
		if (sequenced == null) {
			this.inv.eval(optional, 'object is null or undefined', node, obj)
			return this.ctx.of(undefined)
		}
		const desc = Object.getOwnPropertyDescriptor(sequenced, key)
		if (isPlainObject(sequenced) && desc != null) {
			return desc?.value ?? desc?.get?.call(obj) ?? this.ctx.of(undefined)
		}

		const objRaw = yield obj
		const objForLookup = this.getBuiltinPrototype(objRaw) ?? objRaw
		const tool = getTool(objRaw, objForLookup, key)
		return this.ctx.of(tool)
	}

	/**
	 * Convert a value to string for interpolation/concatenation.
	 * Calls .toString() via getExoProperty if available.
	 */
	* toString(obj: Expr, node: acorn.Node): EvalResult<Expr, string> {
		const raw = yield obj
		if (raw === null) {
			return 'null'
		}
		if (raw === undefined) {
			return 'undefined'
		}

		// Get .toString method from builtin prototype
		const toStringFn = yield* this.getExoProperty(obj, 'toString', node, true)
		const toStringRaw = yield toStringFn
		if (typeof toStringRaw === 'function') {
			const result = this.ctx.call(this.ctx.of(toStringFn), [])
			const resultRaw = yield result
			if (typeof resultRaw === 'string') {
				return resultRaw
			}
		}

		// Fallback
		return '[object]'
	}

	getBuiltinPrototype(value: unknown): unknown {
		if (typeof value === 'string') {
			return this.builtinPrototypes.String
		}
		if (typeof value === 'number') {
			return this.builtinPrototypes.Number
		}
		if (typeof value === 'boolean') {
			return this.builtinPrototypes.Boolean
		}
		if (Array.isArray(value)) {
			return this.builtinPrototypes.Array
		}
		if (value instanceof Date) {
			return this.builtinPrototypes.Date
		}
		return null
	}

	* ObjectExpression(node: acorn.ObjectExpression): EvalResult<Expr> {
		const obj: { [key: string | number]: Expr } = {}
		for (const property of node.properties) {
			if (property.type === 'Property') {
				const key = property.key.type === 'Identifier' && !property.computed ? property.key.name : yield* this.$(property.key)
				this.inv.eval(typeof key === 'string' || typeof key === 'number', 'key is not a string or number', property.key, key)
				const value = yield* this.Expression(property.value)
				this.defineProperty(obj, key, value, property.key)
			}
			else {
				const spread = this.ctx.sequence(yield* this.Expression(property.argument))
				this.inv.eval(isPlainObject(spread), 'can only spread plain objects', property.argument, spread)
				for (const [key, value] of Object.entries(spread)) {
					this.defineProperty(obj, key, value, property.argument)
				}
			}
		}
		return this.ctx.distribute(obj)
	}

	* AwaitExpression(node: acorn.AwaitExpression): EvalResult<Expr> {
		const result = yield makeControl({ control: 'await', value: yield* this.Expression(node.argument) } as const)
		this.inv.eval(this.ctx.isExpr(result), 'internal error: result is not an expression', node, result)
		return result
	}

	* evalStatements(statements: (acorn.Statement | acorn.ModuleDeclaration)[], { module = false } = {}): EvalResult<Expr> {
		let result = this.ctx.of(undefined)
		const exports: { [key: string]: Expr } = {}
		for (const statement of statements) {
			if (statement.type === 'ImportDeclaration') {
				this.inv.parse(false, 'imports are not allowed', statement)
			}
			if (statement.type === 'ExportAllDeclaration' || statement.type === 'ExportNamedDeclaration') {
				this.inv.parse(false, 'only export default is allowed', statement)
			}
			if (statement.type === 'ExportDefaultDeclaration') {
				this.inv.parse(module, 'export is not allowed in script mode', statement)
				const exported = yield* this.Expression(statement.declaration as acorn.Expression)
				this.defineProperty(exports, 'default', exported, statement)
				continue
			}

			result = yield* this.Statement(statement)
		}
		if (module) {
			return this.ctx.distribute(exports)
		}
		return result
	}

	* evalFunctionCall(node: acorn.Function, args: Expr[]): EvalResult<Expr> {
		const child = this.with({ newScope: true })
		for (const [i, param] of node.params.entries()) {
			let arg: Expr
			if (param.type === 'RestElement') {
				this.inv.parse(i === node.params.length - 1, 'rest element must be last', param)
				arg = child.ctx.distribute(args.slice(i))
			}
			else {
				arg = args[i] as Expr
			}
			yield* child.scope.bind(param, arg, child)
		}
		if (node.body.type === 'BlockStatement') {
			return yield* child.evalStatements(node.body.body)
		}
		else {
			const result = yield* child.Expression(node.body)
			return yield* child.makeReturn(result, node.body)
		}
	}

	// eslint-disable-next-line require-yield -- generator-protocol method; callers `yield*` it
	* ArrowFunctionExpression(node: acorn.ArrowFunctionExpression): EvalResult<Expr> {
		let fn: (...args: Expr[]) => Expr | Promise<Expr>
		if (node.async) {
			fn = async (...args: Expr[]) => {
				const iter = this.ctx.doGen(this.evalFunctionCall(node, args))
				let step = iter.next()
				while (!step.done) {
					const raw = getControl(step.value)
					if (raw.control === 'return') {
						return raw.value
					}
          raw.control satisfies 'await'
          step = iter.next(await this.ctx.sequencePromiseLike(raw.value))
				}
				return this.ctx.of(undefined)
			}
		}
		else {
			fn = (...args: Expr[]) => {
				const iter = this.ctx.doGen(this.evalFunctionCall(node, args))
				const step = iter.next()
				if (step.done) {
					return this.ctx.of(undefined)
				}
				const raw = getControl(step.value)
				this.inv.eval(raw.control === 'return', 'unexpected control statement', node, step.value)
				return raw.value
			}
		}
		return this.ctx.of(internalFn(fn, node))
	}

	* UnaryExpression(node: acorn.UnaryExpression): EvalResult<Expr> {
		const operand = yield* this.$(node.argument)
		switch (node.operator) {
			case '!':
				return this.ctx.of(!operand)
			case '-':
				this.inv.eval(typeof operand === 'number', 'operand is not a number', node, operand)
				return this.ctx.of(-operand)
			case 'typeof':
				return this.ctx.of(typeof operand)
			case 'void':
				return this.ctx.of(undefined)
			default:
				this.inv.parse(false, `unsupported unary operator: ${node.operator}`, node)
		}
	}

	* ConditionalExpression(node: acorn.ConditionalExpression): EvalResult<Expr> {
		// Short-circuit: don't eval the condition if the test is null or undefined
		const condition = yield* this.$(node.test)
		if (condition) {
			return yield* this.Expression(node.consequent)
		}
		else {
			return yield* this.Expression(node.alternate)
		}
	}

	* BinaryExpression(node: acorn.BinaryExpression): EvalResult<Expr> {
		this.inv.parse(node.left.type !== 'PrivateIdentifier', 'private identifiers are not allowed', node)
		const leftExpr = yield* this.Expression(node.left)
		const rightExpr = yield* this.Expression(node.right)
		const left = yield leftExpr
		const right = yield rightExpr

		switch (node.operator) {
			case '===':
				return this.ctx.of(left === right)
			case '!==':
				return this.ctx.of(left !== right)
			case '==':
				// eslint-disable-next-line eqeqeq
				return this.ctx.of(left == right)
			case '!=':
				// eslint-disable-next-line eqeqeq
				return this.ctx.of(left != right)
		}

		// For +, if both numbers do addition, otherwise string concatenation
		if (node.operator === '+') {
			if (typeof left === 'number' && typeof right === 'number') {
				return this.ctx.of(left + right)
			}
			const leftStr = yield* this.toString(leftExpr, node.left)
			const rightStr = yield* this.toString(rightExpr, node.right)
			return this.ctx.of(leftStr + rightStr)
		}

		this.inv.eval((typeof left === 'number' || typeof left === 'string') && (typeof right === 'number' || typeof right === 'string'), 'left and right are not numbers or strings', node, { left, right })

		switch (node.operator) {
			case '<':
				return this.ctx.of(left < right)
			case '>':
				return this.ctx.of(left > right)
			case '<=':
				return this.ctx.of(left <= right)
		}

		this.inv.eval((typeof left === 'number') && (typeof right === 'number'), 'left and right are not numbers', node, { left, right })
		switch (node.operator) {
			case '>=':
				return this.ctx.of(left >= right)
			case '<<':
				return this.ctx.of(left << right)
			case '>>':
				return this.ctx.of(left >> right)
			case '>>>':
				return this.ctx.of(left >>> right)
			case '&':
				return this.ctx.of(left & right)
			case '|':
				return this.ctx.of(left | right)
			case '^':
				return this.ctx.of(left ^ right)
			case '%':
				return this.ctx.of(left % right)
			case '/':
				return this.ctx.of(left / right)
			case '*':
				return this.ctx.of(left * right)
			case '**':
				return this.ctx.of(left ** right)
			case '-':
				return this.ctx.of(left - right)
			default:
				this.inv.parse(false, `unsupported binary operator: ${node.operator}`, node)
		}
	}

	* LogicalExpression(node: acorn.LogicalExpression): EvalResult<Expr> {
		const left = yield* this.$(node.left)
		// Short-circuit: don't eval the right if the left is null or undefined
		switch (node.operator) {
			case '&&':
				return this.ctx.of(left && (yield* this.$(node.right)))
			case '||':
				return this.ctx.of(left || (yield* this.$(node.right)))
			case '??':
				return this.ctx.of(left ?? (yield* this.$(node.right)))
			default:
        node.operator satisfies never
				this.inv.parse(false, `unsupported logical operator: ${node.operator}`, node)
		}
	}

	* TemplateLiteral(node: acorn.TemplateLiteral): EvalResult<Expr> {
		const result: string[] = []
		for (const [i, quasi] of node.quasis.entries()) {
			this.inv.eval(quasi.value.cooked != null, 'invalid template literal', quasi, quasi.value.raw)
			result.push(quasi.value.cooked)
			const expr = node.expressions[i]
			if (expr) {
				const exprValue = yield* this.Expression(expr)
				const str = yield* this.toString(exprValue, expr)
				result.push(str)
			}
		}
		return this.ctx.of(result.join(''))
	}

	* NewExpression(node: acorn.NewExpression): EvalResult<Expr> {
		const calee = yield* this.$(node.callee as acorn.Expression)

		this.inv.eval(
			isToolableConstructor(calee),
			'constructor is not a toolable class',
			node,
			calee,
		)

		const args = yield* this.evalArray(node.arguments)
		const rawArgs: unknown[] = []
		for (const arg of args) {
			rawArgs.push(yield arg)
		}

		const instance = Reflect.construct(calee, rawArgs)
		return this.ctx.of(instance)
	}

	* Expression(node: acorn.Expression): EvalResult<Expr> {
		this.inv.parse(allowedExpressions.includes(node.type as (typeof allowedExpressions)[number]), `unsupported expression type: ${node.type}`, node)
		return yield* (this as any)[node.type](node) as unknown as EvalResult<Expr>
	}

	* $(node: acorn.Expression): EvalResult<Expr, unknown> {
		return yield yield* this.Expression(node)
	}

	* makeReturn(value: Expr, node: acorn.Node): EvalResult<Expr> {
		yield makeControl({ control: 'return', value } as const)
		this.inv.eval(false, 'internal error: code executed a return statement', node, value)
	}

	* Statement(node: acorn.Statement): EvalResult<Expr> {
		if (node.type === 'BlockStatement') {
			return yield* this.with({ newScope: true }).evalStatements(node.body)
		}
		if (node.type === 'EmptyStatement') {
			return this.ctx.of(undefined)
		}
		if (node.type === 'VariableDeclaration') {
			this.inv.parse(node.kind === 'const', 'variable declaration must be `const`', node)
			for (const declaration of node.declarations) {
				this.inv.parse(declaration.init != null, 'variable declaration must have an initializer', declaration)
				const value = yield* this.Expression(declaration.init)
				yield* this.scope.bind(declaration.id, value, this)
			}
			return this.ctx.of(undefined)
		}
		if (node.type === 'ExpressionStatement') {
			return yield* this.Expression(node.expression)
		}
		if (node.type === 'ReturnStatement') {
			const value = node.argument == null ? this.ctx.of(undefined) : yield* this.Expression(node.argument)
			yield* this.makeReturn(value, node)
		}
		if (node.type === 'IfStatement') {
			// Short-circuit: don't eval the condition if the test is null or undefined
			const condition = yield* this.$(node.test)
			if (condition) {
				return yield* this.Statement(node.consequent)
			}
			else if (node.alternate) {
				return yield* this.Statement(node.alternate)
			}
			return this.ctx.of(undefined)
		}
		this.inv.parse(false, 'unsupported statement type', node)
	}

	Program(node: acorn.Program, { module = false } = {}): Expr | Promise<Expr> {
		const iter = this.ctx.doGen(this.evalStatements(node.body, { module }))
		let step = iter.next()
		if (step.done) {
			return step.value
		}
		this.inv.eval(getControl(step.value).control === 'await', 'unexpected top-level control statement', node, step.value)

		// Need to evaluate it as async:
		const fn = async () => {
			while (!step.done) {
				const raw = getControl(step.value)
				this.inv.eval(raw.control === 'await', 'internal error: control is not `await`', node, step.value)
				step = iter.next(await this.ctx.sequencePromiseLike(raw.value))
			}
			return step.value
		}
		return fn()
	}
}
