import type { StandardSchemaV1 } from '@standard-schema/spec'

export const toolSymbol = Symbol.for('exoeval_tool')
export const toolFieldsSymbol = Symbol.for('exoeval_toolFields')

export type ToolKind = 'raw' | 'expr' | 'constructor'

export type ToolFunction<T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown> = T & ((...args: unknown[]) => unknown) & {
	[toolSymbol]?: ToolKind
}

export type ToolConstructor<T extends new (...args: unknown[]) => unknown = new (...args: unknown[]) => unknown> = T & {
	[toolSymbol]?: ToolKind
}

type SchemaToParam<Schema extends StandardSchemaV1> = Schema extends StandardSchemaV1<infer Params> ? Params : never
type SchemasToParams<Schemas extends StandardSchemaV1[]> = {
	[K in keyof Schemas]: SchemaToParam<Schemas[K]>
}

const validate = <Schema extends StandardSchemaV1>(schema: Schema, value: unknown, index?: number): unknown => {
	const validation = schema['~standard'].validate(value)
	if (validation instanceof Promise) {
		throw new TypeError(`Validation must be synchronous: ${validation} ${value}`)
	}
	if (validation.issues) {
		const msg = validation.issues.map(e => e.message).join(', ')
		throw new TypeError(`Invalid value: ${msg}${index != null ? ` for argument ${index}` : ''}`)
	}
	return validation.value
}

export const validateArgs = <Schemas extends StandardSchemaV1[]>(methodName: string, inputSchemas: Schemas, args: SchemasToParams<Schemas>): SchemasToParams<Schemas> => {
	const ret = []
	if (args.length > inputSchemas.length) {
		throw new TypeError(`${methodName}: Too many arguments: ${args.length} > ${inputSchemas.length}`)
	}
	for (const [index, schema] of inputSchemas.entries()) {
		ret.push(validate(schema, args[index], index))
	}
	return ret as SchemasToParams<Schemas>
}

export const registerToolField = (obj: unknown, key: string) => {
	if (!Object.getOwnPropertyDescriptor(obj, toolFieldsSymbol)) {
		Object.defineProperty(obj, toolFieldsSymbol, {
			value: new Set<string>(),
			writable: false,
			enumerable: false,
			configurable: false,
		})
	}
	(obj as any)[toolFieldsSymbol].add(key)
}

/**
 * @tool decorator - marks a method, getter, field, or class as a tool
 *
 * Methods: returns a replacement function on the prototype with validation + toolSymbol.
 * Getters: returns a replacement getter with toolSymbol on the function.
 *          If the getter returns a function, it's wrapped with asTool(fn, undefined, schemas).
 * Fields:  adds field name to toolFieldsSymbol Set on instance.
 *          If value is a function with schemas, wraps with asTool.
 * Classes: returns replacement class with constructor validation + toolSymbol.
 *
 * NOTE: @tool() on a class means `new MyClass(...)` is callable by sandboxed code
 * that has a reference to it. This is intended for builtins (e.g. `new Date`, `new Map`)
 * where construction is part of the API. For capability classes where you want to expose
 * only methods (not construction), don't decorate the class — just decorate the methods.
 */
export function tool<Schemas extends StandardSchemaV1[]>(
	...argSchemas: Schemas
): {
	<This, Value extends (this: This, ...args: SchemasToParams<Schemas>) => any>(
		target: Value,
		context: ClassMethodDecoratorContext<This, Value>,
	): Value
	<This, Value>(
		target: (this: This) => Value,
		context: ClassGetterDecoratorContext<This, Value>,
	): (this: This) => Value
	<This, Value>(
		target: undefined,
		context: ClassFieldDecoratorContext<This, Value>,
	): (value: Value) => Value
	// Class decorator last so method/getter/field decorators match first
	<Value extends abstract new (...args: any) => any>(
		target: Value,
		context: ClassDecoratorContext<Value>,
	): void
}
export function tool<Schemas extends StandardSchemaV1[]>(...argSchemas: Schemas) {
	return function (
		target: any,
		context: ClassMethodDecoratorContext | ClassGetterDecoratorContext | ClassFieldDecoratorContext | ClassDecoratorContext,
	): any {
		const key = String(context.name)

		if (context.kind === 'method') {
			return asToolFn(target, argSchemas)
		}

		if (context.kind === 'getter') {
			// Return replacement getter with toolSymbol on the function
			const newGetter = function (this: unknown) {
				const result = Reflect.apply(target, this, [])
				if (typeof result === 'function') {
					return asToolFn(result as (...args: any[]) => unknown, argSchemas)
				}
				return result
			}
			return asToolFn(newGetter, [])
		}

		if (context.kind === 'field') {
			// Register field name in toolFieldsSymbol Set via addInitializer
			context.addInitializer(function (this: unknown) {
				registerToolField(this, key)
			})
			// Return init function that wraps function values
			return function (initialValue: unknown) {
				if (typeof initialValue === 'function') {
					return asToolFn(initialValue as (...args: SchemasToParams<Schemas>) => unknown, argSchemas)
				}
				return initialValue
			}
		}

		if (context.kind === 'class') {
			return asToolConstructor(target, argSchemas)
		}
	}
}

const makeFnSchema = (retSchema: StandardSchemaV1, allowOptional = false): StandardSchemaV1 & { optional: () => StandardSchemaV1 } => {
	const schema: StandardSchemaV1 = {
		'~standard': {
			version: 1,
			vendor: 'exoeval',
			validate: (value: unknown) => {
				if (value === undefined && allowOptional) { return { value: undefined } }
				if (typeof value !== 'function') {
					return { issues: [{ message: 'Expected a function' }] }
				}
				return {
					value: (...args: unknown[]) => {
						const res = Reflect.apply(value, undefined, args)
						if (res != null && typeof res === 'object' && 'then' in res && typeof (res as Promise<unknown>).then === 'function') {
							// For now, just disable returning promises -- we need a special tool for promises
							// that we can add later.
							throw new TypeError(`${value.name}: Promise not allowed`)
						}
						return validate(retSchema, res)
					},
				}
			},
		},
	}
	return Object.assign(schema, {
		optional() { return makeFnSchema(retSchema, true) },
	})
}

export const fn = {
	returns(retSchema: StandardSchemaV1) { return makeFnSchema(retSchema) },
}

export const expr = () => (target: any, _context: ClassMethodDecoratorContext): any => {
	;(target as any)[toolSymbol] = 'expr'
	return target
}

export function asToolFn<Schemas extends StandardSchemaV1[], T extends (...args: SchemasToParams<Schemas>) => unknown>(fn: T, schemas: Schemas): T & ToolFunction {
	const name = fn.name || 'anonymous'
	const { [name]: wrapped } = {
		[name](this: unknown, ...args: SchemasToParams<Schemas>) {
			const validatedArgs = validateArgs(name, schemas, args)
			return Reflect.apply(fn, this, validatedArgs)
		},
	}
  ;(wrapped as ToolFunction)[toolSymbol] = 'raw'
	return wrapped as T & ToolFunction
}

function asToolConstructor<Schemas extends StandardSchemaV1[], T extends new (...args: SchemasToParams<Schemas>) => object>(Original: T, argSchemas: Schemas): T & ToolConstructor {
	const { [Original.name]: Wrapped } = { [Original.name]: class extends (Original as any) {
		constructor(...args: any[]) {
			const validated = argSchemas.length > 0 ? validateArgs(`new ${Original.name}`, argSchemas, args as SchemasToParams<Schemas>) : args
			super(...validated as any)
		}
	} }
  ;(Wrapped as any)[toolSymbol] = 'constructor'
	return Wrapped as T & ToolConstructor
}

export const isToolableFunction = (value: unknown): value is ToolFunction => {
	return typeof value === 'function' && (value as ToolFunction)[toolSymbol] === 'raw'
}

export const isExprFunction = (value: unknown): boolean => {
	return typeof value === 'function' && (value as any)[toolSymbol] === 'expr'
}

export const isToolableConstructor = (value: unknown): value is ToolConstructor => {
	return typeof value === 'function' && (value as ToolConstructor)[toolSymbol] === 'constructor'
}

const getToolUnbound = (thisArg: unknown, obj: unknown, key: string | number): unknown => {
	let current: unknown = obj
	while (current != null) {
		const desc = Object.getOwnPropertyDescriptor(current, key)
		if (desc) {
			if (desc.get && isToolableFunction(desc.get)) {
				return desc.get.call(thisArg)
			}
			// Toolable function (method on prototype) — bind to obj
			if ((isToolableFunction(desc.value) || isExprFunction(desc.value))) {
				return desc.value
			}
			// Tool field (name in toolFieldsSymbol Set)
			if ((current as any)[toolFieldsSymbol]?.has(String(key))) {
				return 'value' in desc ? desc.value : desc.get?.call(thisArg)
			}

			// The field exists but is not visible, so return undefined:
			return undefined
		}
		current = Object.getPrototypeOf(current)
	}
	return undefined
}

export const getTool = (thisArg: unknown, obj: unknown, key: string | number): unknown => {
	const unbound = getToolUnbound(thisArg, obj, key)
	if (typeof unbound === 'function' && toolSymbol in unbound) {
		const bound = unbound.bind(thisArg)
    ;(bound as any)[toolSymbol] = unbound[toolSymbol]
		return bound
	}
	return unbound
}
