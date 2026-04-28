import type * as acorn from 'acorn'
import type { EvalResult, Evaluator } from './evaluator'
import { isPlainObject } from './expr'

export class Scope<T> {
	private readonly bindings: Map<string, T> = new Map()
	constructor(private readonly parent: Scope<T> | undefined) {}

	get(node: acorn.Identifier, evaluator: Evaluator<T>): T {
		const res = this.bindings.get(node.name)
		if (res === undefined) {
			if (this.bindings.has(node.name)) {
				// It's in the map, but is undefined:
				return res as T
			}
			evaluator.inv.parse(this.parent != null, `variable is not defined: ${node.name}`, node)
			return this.parent.get(node, evaluator)
		}
		return res
	}

	set(node: acorn.Identifier, value: T, evaluator: Evaluator<T>): void {
		evaluator.inv.parse(!this.bindings.has(node.name), `variable is already defined: ${node.name}`, node)
		this.bindings.set(node.name, value)
	}

	* bind(param: acorn.Pattern, value: T, evaluator: Evaluator<T>): EvalResult<T> {
		switch (param.type) {
			case 'AssignmentPattern':
				yield* this.AssignmentPattern(param, value, evaluator)
				break
			case 'ArrayPattern':
				yield* this.ArrayPattern(param, value, evaluator)
				break
			case 'ObjectPattern':
				yield* this.ObjectPattern(param, value, evaluator)
				break
			case 'Identifier':
				this.set(param, value, evaluator)
				break
			case 'RestElement':
				{ const rawValue = yield value
					evaluator.inv.eval(Array.isArray(rawValue), 'expected array', param, rawValue)
				}
				return yield* this.bind(param.argument, value, evaluator)
			default:
        param.type satisfies 'MemberExpression'
				evaluator.inv.parse(false, 'unexpected pattern type', param)
		}
		return value
	}

	* AssignmentPattern(param: acorn.AssignmentPattern, value: T, evaluator: Evaluator<T>): EvalResult<T, void> {
		const rawValue = yield value
		const rhs = rawValue === undefined ? (yield* evaluator.Expression(param.right)) : value
		yield* this.bind(param.left, rhs, evaluator)
	}

	* ArrayPattern(param: acorn.ArrayPattern, value: T, evaluator: Evaluator<T>): EvalResult<T, void> {
		const rawValue = yield value
		evaluator.inv.eval(Array.isArray(rawValue), 'expected array', param, rawValue)
		const arrayVal: unknown[] = rawValue
		for (const [idx, pat] of param.elements.entries()) {
			if (pat == null) {
				continue
			}
			if (pat.type === 'RestElement') {
				evaluator.inv.parse(idx === param.elements.length - 1, 'rest element must be last', param)
				const rest = arrayVal.slice(idx)
				yield* this.bind(pat.argument, evaluator.ctx.of(rest), evaluator)
				break
			}
			yield* this.bind(pat, evaluator.ctx.of(arrayVal[idx]), evaluator)
		}
	}

	* ObjectPattern(param: acorn.ObjectPattern, value: T, evaluator: Evaluator<T>): EvalResult<T, void> {
		const bound: Set<string | number> = new Set<string | number>()
		const val = evaluator.ctx.sequence(value)
		evaluator.inv.eval(val != null, 'cannot destructure null object', param, val)

		for (const [i, property] of param.properties.entries()) {
			if (property.type === 'Property') {
				const key = property.key.type === 'Identifier' && !property.computed
					? property.key.name
					: yield (yield* evaluator.Expression(property.key))
				evaluator.inv.eval(typeof key === 'string' || typeof key === 'number', 'key is not a string or number', property.key, key)

				bound.add(key)
				yield* this.bind(property.value, yield* evaluator.getExoProperty(value, key, property.key, false), evaluator)
			}
			else {
				evaluator.inv.parse(property.type === 'RestElement', 'unexpected property type', property)
				evaluator.inv.parse(i === param.properties.length - 1, 'rest element must be last', property)
				evaluator.inv.eval(isPlainObject(val), 'cannot destructure non-object', property, val)
				const rest = Object.fromEntries(Object.entries(val).filter(([key]) => !bound.has(key)))
				yield* this.bind(property.argument, evaluator.ctx.distribute(rest), evaluator)
			}
		}
	}
}
