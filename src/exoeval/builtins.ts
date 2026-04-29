import type { ExpressionContext } from './expr'
import type { IExoArray, IExoBoolean, IExoDate, IExoJSON, IExoMath, IExoNumber, IExoPromise, IExoString } from './lib'
import sjson from 'secure-json-parse'
import z from 'zod'
import { isPlainObject } from './expr'
import { expr, fn, tool } from './tool'
import { disallowedProperties } from './utils'

@tool()
export class ExoArray<T = unknown> implements IExoArray<T> {
	constructor(...args: Parameters<typeof Array>) {
		return new Array(...args) as unknown as ExoArray<T>
	}

	[index: number]: T

	@tool()
	get length(): number {
		if (!Array.isArray(this)) {
			throw new TypeError('unexpected: `this` not bound to an array')
		}
		return this.length
	}

	@tool(fn.returns(z.any()))
	get map() { return Array.prototype.map }

	@tool(fn.returns(z.any()))
	get filter() { return Array.prototype.filter }

	@tool(fn.returns(z.any()), z.any().optional())
	get reduce() { return Array.prototype.reduce }

	@tool(fn.returns(z.any()), z.any().optional())
	get reduceRight() { return Array.prototype.reduceRight }

	@tool(fn.returns(z.any()))
	get find() { return Array.prototype.find }

	@tool(fn.returns(z.any()))
	get findIndex() { return Array.prototype.findIndex }

	@tool(fn.returns(z.any()))
	get findLast() { return Array.prototype.findLast }

	@tool(fn.returns(z.any()))
	get findLastIndex() { return Array.prototype.findLastIndex }

	@tool(fn.returns(z.any()))
	get some() { return Array.prototype.some }

	@tool(fn.returns(z.any()))
	get every() { return Array.prototype.every }

	@tool(fn.returns(z.any()))
	get flatMap() { return Array.prototype.flatMap }

	@tool(fn.returns(z.void()))
	get forEach() { return Array.prototype.forEach }

	@tool(fn.returns(z.any()).optional())
	get toSorted() { return Array.prototype.toSorted }

	@tool(z.number())
	get at() { return Array.prototype.at }

	@tool(z.number().optional(), z.number().optional())
	get slice() { return Array.prototype.slice }

	@tool(z.string().optional())
	get join() { return Array.prototype.join }

	@tool(z.array(z.any()))
	get concat() { return Array.prototype.concat }

	@tool(z.any(), z.number().optional())
	get indexOf() { return Array.prototype.indexOf }

	@tool(z.any(), z.number().optional())
	get lastIndexOf() { return Array.prototype.lastIndexOf }

	@tool(z.any())
	get includes() { return Array.prototype.includes }

	@tool(z.number().optional())
	get flat() { return Array.prototype.flat }

	@tool()
	get entries() { return Array.prototype.entries }

	@tool()
	get keys() { return Array.prototype.keys }

	@tool()
	get values() { return Array.prototype.values }

	@tool()
	get toReversed() { return Array.prototype.toReversed }

	@tool(z.number(), z.number().optional(), z.any().optional())
	get toSpliced() { return Array.prototype.toSpliced }

	@tool(z.number(), z.any())
	get with() { return Array.prototype.with }

	@tool()
	get toString() { return Array.prototype.toString }

	// Statics
	@tool(z.array(z.any()))
	static from(arrayLike: ArrayLike<unknown>) { return Array.from(arrayLike) }

	@tool(z.any())
	static isArray(value: unknown) { return Array.isArray(value) }
}

@tool(z.union([z.string(), z.number(), z.instanceof(Date), z.boolean(), z.null(), z.undefined(), z.bigint()]))
export class ExoString implements IExoString {
	constructor(...args: Parameters<typeof String>) {
		return new String(...args) as unknown as ExoString
	}

	@tool()
	get length(): number {
		if (!(typeof this === 'string')) {
			throw new TypeError('unexpected: `this` not bound to a string')
		}
		return (this as string).length
	}

	@tool(z.number())
	get at() { return String.prototype.at }

	@tool(z.number())
	get charAt() { return String.prototype.charAt }

	@tool(z.number())
	get charCodeAt() { return String.prototype.charCodeAt }

	@tool(z.number())
	get codePointAt() { return String.prototype.codePointAt }

	@tool(z.string())
	get concat() { return String.prototype.concat }

	@tool(z.string(), z.number().optional())
	get endsWith() { return String.prototype.endsWith }

	@tool(z.string(), z.number().optional())
	get includes() { return String.prototype.includes }

	@tool(z.string(), z.number().optional())
	get indexOf() { return String.prototype.indexOf }

	@tool(z.string(), z.number().optional())
	get lastIndexOf() { return String.prototype.lastIndexOf }

	@tool(z.number(), z.string().optional())
	get padEnd() { return String.prototype.padEnd }

	@tool(z.number(), z.string().optional())
	get padStart() { return String.prototype.padStart }

	@tool(z.number())
	get repeat() { return String.prototype.repeat }

	@tool(z.string(), z.string())
	get replace() { return String.prototype.replace }

	@tool(z.string(), z.string())
	get replaceAll() { return String.prototype.replaceAll }

	@tool(z.number().optional(), z.number().optional())
	get slice() { return String.prototype.slice }

	@tool(z.string(), z.number().optional())
	get split() { return String.prototype.split }

	@tool(z.string(), z.number().optional())
	get startsWith() { return String.prototype.startsWith }

	@tool(z.number().optional(), z.number().optional())
	get substring() { return String.prototype.substring }

	@tool()
	get toLowerCase() { return String.prototype.toLowerCase }

	@tool()
	get toUpperCase() { return String.prototype.toUpperCase }

	@tool()
	get trim() { return String.prototype.trim }

	@tool()
	get trimEnd() { return String.prototype.trimEnd }

	@tool()
	get trimStart() { return String.prototype.trimStart }

	@tool()
	get toString() { return String.prototype.toString }
}

@tool(z.union([z.string(), z.number(), z.instanceof(Date)]).optional())
export class ExoDate implements IExoDate {
	constructor()
	constructor(value: string | number | Date)
	constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number)
	constructor(...args: Parameters<typeof Date>) {
		return new Date(...args)
	}

	// Date.prototype methods require native Date as this; bind raw so asTool receives correct receiver
	@tool()
	get getTime() { return Date.prototype.getTime }

	@tool()
	get getFullYear() { return Date.prototype.getFullYear }

	@tool()
	get getMonth() { return Date.prototype.getMonth }

	@tool()
	get getDate() { return Date.prototype.getDate }

	@tool()
	get getHours() { return Date.prototype.getHours }

	@tool()
	get getMinutes() { return Date.prototype.getMinutes }

	@tool()
	get getSeconds() { return Date.prototype.getSeconds }

	@tool()
	get getMilliseconds() { return Date.prototype.getMilliseconds }

	@tool()
	get toISOString() { return Date.prototype.toISOString }

	@tool(z.string().optional(), z.record(z.string(), z.union([z.string(), z.boolean(), z.undefined()])).optional())
	get toLocaleDateString() { return Date.prototype.toLocaleDateString }

	@tool(z.string().optional(), z.record(z.string(), z.union([z.string(), z.boolean(), z.undefined()])).optional())
	get toLocaleTimeString() { return Date.prototype.toLocaleTimeString }

	@tool(z.string().optional(), z.record(z.string(), z.union([z.string(), z.boolean(), z.undefined()])).optional())
	get toLocaleString() { return Date.prototype.toLocaleString }

	@tool()
	get valueOf() { return Date.prototype.valueOf }

	@tool()
	get toString() { return Date.prototype.toString }

	// Statics
	@tool()
	static now() { return Date.now() }

	@tool(z.string())
	static parse(dateString: string) { return Date.parse(dateString) }
}

export class ExoObject {
	@expr()
	static keys(ctx: ExpressionContext, obj: unknown) {
		const seq = ctx.sequence(obj)
		if (!isPlainObject(seq)) {
			throw new TypeError('Object.keys requires an object')
		}
		return ctx.distribute(Object.keys(seq).map(k => ctx.of(k)))
	}

	@expr()
	static values(ctx: ExpressionContext, obj: unknown) {
		const seq = ctx.sequence(obj)
		if (!isPlainObject(seq)) {
			throw new TypeError('Object.values requires an object')
		}
		return ctx.distribute(Object.values(seq))
	}

	@expr()
	static entries(ctx: ExpressionContext, obj: unknown) {
		const seq = ctx.sequence(obj)
		if (!isPlainObject(seq)) {
			throw new TypeError('Object.entries requires an object')
		}
		return ctx.distribute(
			Object.entries(seq).map(([k, v]) => ctx.distribute([ctx.of(k), v])),
		)
	}

	@tool(z.array(z.tuple([z.intersection(z.string(), z.custom((k: unknown) => !disallowedProperties.has(k as string), {
		error: (k: { input: unknown }) => `${k.input} is not an allowed property name`,
	})), z.any()])))
	static fromEntries(entries: [string, unknown][]) {
		return Object.fromEntries(entries)
	}
}

@tool(z.any())
export class ExoBoolean implements IExoBoolean {
	constructor(...args: Parameters<typeof Boolean>) {
		return new Boolean(...args)
	}

	@tool()
	get valueOf() { return Boolean.prototype.valueOf }

	@tool()
	get toString() { return Boolean.prototype.toString }
}

export class ExoJSON {
	@tool(z.string())
	static parse(text: string) { return sjson.parse(text) }

	@tool(z.any(), z.union([z.null(), z.undefined()]), z.number().optional())
	static stringify(value: unknown, replacer?: null, space?: number) {
		return JSON.stringify(value, replacer, space)
	}
}

export class ExoMath {
	@tool(z.number(), z.number())
	static min(a: number, b: number) { return Math.min(a, b) }

	@tool(z.number(), z.number())
	static max(a: number, b: number) { return Math.max(a, b) }

	@tool(z.number())
	static round(x: number) { return Math.round(x) }

	@tool(z.number())
	static floor(x: number) { return Math.floor(x) }

	@tool(z.number())
	static ceil(x: number) { return Math.ceil(x) }

	@tool(z.number())
	static abs(x: number) { return Math.abs(x) }

	@tool(z.number())
	static sqrt(x: number) { return Math.sqrt(x) }

	@tool(z.number(), z.number())
	static pow(base: number, exp: number) { return base ** exp }

	@tool(z.number())
	static log(x: number) { return Math.log(x) }

	@tool()
	static random() { return Math.random() }

	@tool(z.number())
	static sign(x: number) { return Math.sign(x) }

	@tool(z.number())
	static trunc(x: number) { return Math.trunc(x) }
}

export class ExoPromise {
	@tool(z.array(z.any()))
	static all(values: unknown[]) { return Promise.all(values as Promise<unknown>[]) }

	@tool(z.array(z.any()))
	static allSettled(values: unknown[]) { return Promise.allSettled(values as Promise<unknown>[]) }

	@tool(z.array(z.any()))
	static race(values: unknown[]) { return Promise.race(values as Promise<unknown>[]) }

	@tool(z.any())
	static resolve(value: unknown) { return Promise.resolve(value) }

	@tool(z.any())
	static reject(reason: unknown) { return Promise.reject(reason) }
}

@tool(z.union([z.string(), z.number(), z.bigint()]))
export class ExoNumber implements IExoNumber {
	constructor(...args: Parameters<typeof Number>) {
		return new Number(...args)
	}

	@tool(z.number().optional())
	get toString() { return Number.prototype.toString }

	@tool(z.string(), z.number().optional())
	static parseInt(s: string, radix?: number) { return Number.parseInt(s, radix) }

	@tool(z.string())
	static parseFloat(s: string) { return Number.parseFloat(s) }

	@tool(z.any())
	static isNaN(value: unknown) { return Number.isNaN(value) }

	@tool(z.any())
	static isFinite(value: unknown) { return Number.isFinite(value) }

	@tool(z.any())
	static isInteger(value: unknown) { return Number.isInteger(value) }
}

// Static-only classes can't use `implements` — check with satisfies instead.
ExoJSON satisfies IExoJSON
ExoMath satisfies IExoMath
ExoPromise satisfies IExoPromise
