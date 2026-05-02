import type * as acorn from 'acorn'
import { parse } from 'acorn'
import { ExoArray, ExoBoolean, ExoDate, ExoJSON, ExoMath, ExoNumber, ExoObject, ExoPromise, ExoString } from './builtins'
import { Evaluator } from './evaluator'
import { ExpressionContext, IdentityContext } from './expr'
import { Scope } from './scope'

export { asToolFn } from './tool'
export type { ToolFunction } from './tool'

const builtins: { [key: string]: unknown } = {
	Array: ExoArray,
	String: ExoString,
	Object: ExoObject,
	Date: ExoDate,
	Boolean: ExoBoolean,
	JSON: ExoJSON,
	Math: ExoMath,
	Number: ExoNumber,
	Promise: ExoPromise,
}

export function exoEval(code: string, bindings?: { [key: string]: unknown }): unknown
export function exoEval<T>(code: string, ctx: ExpressionContext<T>): T
export function exoEval(code: string, bindingsOrCtx?: { [key: string]: unknown } | ExpressionContext<unknown>): unknown {
	const ctx = bindingsOrCtx instanceof ExpressionContext ? bindingsOrCtx : new IdentityContext()
	const bindings = bindingsOrCtx instanceof ExpressionContext ? undefined : bindingsOrCtx
	const ast = parse(code, { ecmaVersion: 2022 })
	const rootScope = new Scope<unknown>(undefined)
	const evaluator = new Evaluator(ast, code, ctx, rootScope, {
		Array: ExoArray.prototype,
		String: ExoString.prototype,
		Date: ExoDate.prototype,
		Number: ExoNumber.prototype,
		Boolean: ExoBoolean.prototype,
	})

	for (const [name, value] of Object.entries(builtins)) {
		rootScope.set(
			{ type: 'Identifier', name, start: 0, end: 0 } as acorn.Identifier,
			ctx.of(value),
			evaluator,
		)
	}

	if (bindings) {
		for (const [name, value] of Object.entries(bindings)) {
			rootScope.set(
				{ type: 'Identifier', name, start: 0, end: 0 } as acorn.Identifier,
				ctx.of(value),
				evaluator,
			)
		}
	}

	return evaluator.Program(ast)
}

export function exoImport(code: string): { [key: string]: unknown } | Promise<{ [key: string]: unknown }>
export function exoImport<T>(code: string, ctx: ExpressionContext<T>): { [key: string]: unknown } | Promise<{ [key: string]: unknown }>
export function exoImport(code: string, ctx = new IdentityContext()): { [key: string]: unknown } | Promise<{ [key: string]: unknown }> {
	const ast = parse(code, { ecmaVersion: 2022, sourceType: 'module' })
	const rootScope = new Scope<unknown>(undefined)
	const evaluator = new Evaluator(ast, code, ctx, rootScope, {
		Array: ExoArray.prototype,
		String: ExoString.prototype,
		Date: ExoDate.prototype,
		Number: ExoNumber.prototype,
		Boolean: ExoBoolean.prototype,
	})

	for (const [name, value] of Object.entries(builtins)) {
		rootScope.set(
			{ type: 'Identifier', name, start: 0, end: 0 } as acorn.Identifier,
			ctx.of(value),
			evaluator,
		)
	}

	const result = evaluator.Program(ast, { module: true })
	return result as { [key: string]: unknown } | Promise<{ [key: string]: unknown }>
}

export const exoFn = <T extends (...args: any[]) => unknown>(fn: T): T => {
	return exoEval(fn.toString()) as T
}
