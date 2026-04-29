import { toolFieldsSymbol } from './tool'

const control = Symbol('control')
export type Control<V extends { value: unknown } = { value: unknown }> = { [control]: V }

/* eslint-disable no-redeclare -- TS overload signatures */
export function getControl<C extends Control>(cntrl: C): C[typeof control]
export function getControl(value: object): { value: unknown } | undefined
export function getControl(value: object): { value: unknown } | undefined {
	return (value as Control)[control] as { value: unknown } | undefined
}
/* eslint-enable no-redeclare */
export const isControl = (value: unknown): value is Control => {
	return value != null && (getControl(value) != null)
}
export const makeControl = <T, V extends { value: T }>(obj: V): Control<V> => {
	return { [control]: obj }
}

export const isPlainObject = (value: unknown): value is { [key: string]: unknown } => {
	if (typeof value !== 'object' || value === null) {
		return false
	}
	const proto = Object.getPrototypeOf(value)
	return proto === null || proto === Object.prototype
}

export abstract class ExpressionContext<Expr = unknown> {
	abstract of(value: unknown): Expr
	abstract doGen<C extends Control<{ value: Expr }>>(gen: Generator<C | Expr, Expr, unknown>): Generator<C, Expr, unknown>
	// Returns a plain object, array, or just the toolable fields of an expression if it's an object
	abstract sequence(expr: Expr): { [key in string | number]: Expr } | Expr[] | null | undefined
	abstract sequencePromiseLike(expr: Expr): PromiseLike<Expr> | Expr
	abstract distribute(entries: { [ key in string | number]: Expr } | Expr[]): Expr
	abstract isExpr(value: unknown): value is Expr
	abstract call(callee: Expr, args: Expr[]): Expr

	do(gen: Generator<Expr, Expr, unknown>): Expr {
		const genInner = this.doGen(gen)
		let step = genInner.next()
		while (!step.done) {
			if (isControl(step.value)) {
				throw new Error('unexpected control statement in do')
			}
			step = genInner.next(step.value)
		}
		return step.value
	}

	chain(expr: Expr, then: (value: unknown) => Expr): Expr {
		return this.do((function* () {
			const value = yield expr
			return then(value)
		})())
	}
}

export class IdentityContext extends ExpressionContext<unknown> {
	* doGen<C extends Control<{ value: unknown }>>(gen: Generator<C | unknown, unknown, unknown>): Generator<C, unknown, unknown> {
		let step = gen.next()
		while (!step.done) {
			const next = isControl(step.value) ? yield (step.value as C) : step.value
			step = gen.next(next)
		}
		return step.value
	}

	of(value: unknown) {
		return value
	}

	call(callee: unknown, args: unknown[]): unknown {
		return Reflect.apply(callee as (...args: unknown[]) => unknown, undefined, args)
	}

	sequence(obj: unknown): { [key in string | number]: unknown } | unknown[] | null | undefined {
		if (obj == null || isPlainObject(obj) || Array.isArray(obj)) {
			return obj
		}
		const result: { [key: string]: unknown } = {}
		const fields = (obj as any)[toolFieldsSymbol] as Set<string> | undefined
		if (fields) {
			for (const key of fields) {
				Object.defineProperty(result, key, { value: (obj as any)[key], enumerable: true, writable: true, configurable: true })
			}
		}
		return result
	}

	sequencePromiseLike(expr: unknown) {
		return expr
	}

	distribute(entries: unknown) {
		return entries
	}

	isExpr(value: unknown): value is unknown {
		return !isControl(value)
	}
}
