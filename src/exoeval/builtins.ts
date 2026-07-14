import type { ExpressionContext } from './expr'
import type { IExoArray, IExoBoolean, IExoDate, IExoJSON, IExoMath, IExoNumber, IExoPromise, IExoString } from './lib'
import sjson from 'secure-json-parse'
import z from 'zod'
import { isPlainObject } from '../util'
import { expr, fn, expose } from './tool'
import { disallowedProperties } from './utils'

@expose()
export class ExoArray<T = unknown> implements IExoArray<T> {
	constructor(...args: Parameters<typeof Array>) {
		return new Array(...args) as unknown as ExoArray<T>
	}

	[index: number]: T

	@expose()
	get length(): number {
		if (!Array.isArray(this)) {
			throw new TypeError('unexpected: `this` not bound to an array')
		}
		return this.length
	}

	@expose(fn.returns(z.any()))
	get map() { return Array.prototype.map }

	@expose(fn.returns(z.any()))
	get filter() { return Array.prototype.filter }

	@expose(fn.returns(z.any()), z.any().optional())
	get reduce() { return Array.prototype.reduce }

	@expose(fn.returns(z.any()), z.any().optional())
	get reduceRight() { return Array.prototype.reduceRight }

	@expose(fn.returns(z.any()))
	get find() { return Array.prototype.find }

	@expose(fn.returns(z.any()))
	get findIndex() { return Array.prototype.findIndex }

	@expose(fn.returns(z.any()))
	get findLast() { return Array.prototype.findLast }

	@expose(fn.returns(z.any()))
	get findLastIndex() { return Array.prototype.findLastIndex }

	@expose(fn.returns(z.any()))
	get some() { return Array.prototype.some }

	@expose(fn.returns(z.any()))
	get every() { return Array.prototype.every }

	@expose(fn.returns(z.any()))
	get flatMap() { return Array.prototype.flatMap }

	@expose(fn.returns(z.void()))
	get forEach() { return Array.prototype.forEach }

	@expose(fn.returns(z.any()).optional())
	get toSorted() { return Array.prototype.toSorted }

	@expose(z.number())
	get at() { return Array.prototype.at }

	@expose(z.number().optional(), z.number().optional())
	get slice() { return Array.prototype.slice }

	@expose(z.string().optional())
	get join() { return Array.prototype.join }

	@expose(z.array(z.any()))
	get concat() { return Array.prototype.concat }

	@expose(z.any(), z.number().optional())
	get indexOf() { return Array.prototype.indexOf }

	@expose(z.any(), z.number().optional())
	get lastIndexOf() { return Array.prototype.lastIndexOf }

	@expose(z.any())
	get includes() { return Array.prototype.includes }

	@expose(z.number().optional())
	get flat() { return Array.prototype.flat }

	@expose()
	get entries() { return Array.prototype.entries }

	@expose()
	get keys() { return Array.prototype.keys }

	@expose()
	get values() { return Array.prototype.values }

	@expose()
	get toReversed() { return Array.prototype.toReversed }

	@expose(z.number(), z.number().optional(), z.any().optional())
	get toSpliced() { return Array.prototype.toSpliced }

	@expose(z.number(), z.any())
	get with() { return Array.prototype.with }

	@expose()
	get toString() { return Array.prototype.toString }

	// Statics
	@expose(z.array(z.any()))
	static from(arrayLike: ArrayLike<unknown>) { return Array.from(arrayLike) }

	@expose(z.any())
	static isArray(value: unknown) { return Array.isArray(value) }
}

@expose(z.union([z.string(), z.number(), z.instanceof(Date), z.boolean(), z.null(), z.undefined(), z.bigint()]))
export class ExoString implements IExoString {
	constructor(...args: Parameters<typeof String>) {
		return new String(...args) as unknown as ExoString
	}

	@expose()
	get length(): number {
		if (!(typeof this === 'string')) {
			throw new TypeError('unexpected: `this` not bound to a string')
		}
		return (this as string).length
	}

	@expose(z.number())
	get at() { return String.prototype.at }

	@expose(z.number())
	get charAt() { return String.prototype.charAt }

	@expose(z.number())
	get charCodeAt() { return String.prototype.charCodeAt }

	@expose(z.number())
	get codePointAt() { return String.prototype.codePointAt }

	@expose(z.string())
	get concat() { return String.prototype.concat }

	@expose(z.string(), z.number().optional())
	get endsWith() { return String.prototype.endsWith }

	@expose(z.string(), z.number().optional())
	get includes() { return String.prototype.includes }

	@expose(z.string(), z.number().optional())
	get indexOf() { return String.prototype.indexOf }

	@expose(z.string(), z.number().optional())
	get lastIndexOf() { return String.prototype.lastIndexOf }

	@expose(z.number(), z.string().optional())
	get padEnd() { return String.prototype.padEnd }

	@expose(z.number(), z.string().optional())
	get padStart() { return String.prototype.padStart }

	@expose(z.number())
	get repeat() { return String.prototype.repeat }

	@expose(z.string(), z.string())
	get replace() { return String.prototype.replace }

	@expose(z.string(), z.string())
	get replaceAll() { return String.prototype.replaceAll }

	@expose(z.number().optional(), z.number().optional())
	get slice() { return String.prototype.slice }

	@expose(z.string(), z.number().optional())
	get split() { return String.prototype.split }

	@expose(z.string(), z.number().optional())
	get startsWith() { return String.prototype.startsWith }

	@expose(z.number().optional(), z.number().optional())
	get substring() { return String.prototype.substring }

	@expose()
	get toLowerCase() { return String.prototype.toLowerCase }

	@expose()
	get toUpperCase() { return String.prototype.toUpperCase }

	@expose()
	get trim() { return String.prototype.trim }

	@expose()
	get trimEnd() { return String.prototype.trimEnd }

	@expose()
	get trimStart() { return String.prototype.trimStart }

	@expose()
	get toString() { return String.prototype.toString }
}

@expose(z.union([z.string(), z.number(), z.instanceof(Date)]).optional())
export class ExoDate implements IExoDate {
	constructor()
	constructor(value: string | number | Date)
	constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number)
	constructor(...args: Parameters<typeof Date>) {
		return new Date(...args)
	}

	// Date.prototype methods require native Date as this; bind raw so asTool receives correct receiver
	@expose()
	get getTime() { return Date.prototype.getTime }

	@expose()
	get getFullYear() { return Date.prototype.getFullYear }

	@expose()
	get getMonth() { return Date.prototype.getMonth }

	@expose()
	get getDate() { return Date.prototype.getDate }

	@expose()
	get getHours() { return Date.prototype.getHours }

	@expose()
	get getMinutes() { return Date.prototype.getMinutes }

	@expose()
	get getSeconds() { return Date.prototype.getSeconds }

	@expose()
	get getMilliseconds() { return Date.prototype.getMilliseconds }

	@expose()
	get toISOString() { return Date.prototype.toISOString }

	@expose(z.string().optional(), z.record(z.string(), z.union([z.string(), z.boolean(), z.undefined()])).optional())
	get toLocaleDateString() { return Date.prototype.toLocaleDateString }

	@expose(z.string().optional(), z.record(z.string(), z.union([z.string(), z.boolean(), z.undefined()])).optional())
	get toLocaleTimeString() { return Date.prototype.toLocaleTimeString }

	@expose(z.string().optional(), z.record(z.string(), z.union([z.string(), z.boolean(), z.undefined()])).optional())
	get toLocaleString() { return Date.prototype.toLocaleString }

	@expose()
	get valueOf() { return Date.prototype.valueOf }

	@expose()
	get toString() { return Date.prototype.toString }

	// Statics
	@expose()
	static now() { return Date.now() }

	@expose(z.string())
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

	@expose(z.array(z.tuple([z.intersection(z.string(), z.custom((k: unknown) => !disallowedProperties.has(k as string), {
		error: (k: { input: unknown }) => `${k.input} is not an allowed property name`,
	})), z.any()])))
	static fromEntries(entries: [string, unknown][]) {
		return Object.fromEntries(entries)
	}
}

@expose(z.any())
export class ExoBoolean implements IExoBoolean {
	constructor(...args: Parameters<typeof Boolean>) {
		return new Boolean(...args)
	}

	@expose()
	get valueOf() { return Boolean.prototype.valueOf }

	@expose()
	get toString() { return Boolean.prototype.toString }
}

export class ExoJSON {
	@expose(z.string())
	static parse(text: string) { return sjson.parse(text) }

	@expose(z.any(), z.union([z.null(), z.undefined()]), z.number().optional())
	static stringify(value: unknown, replacer?: null, space?: number) {
		return JSON.stringify(value, replacer, space)
	}
}

export class ExoMath {
	@expose(z.number(), z.number())
	static min(a: number, b: number) { return Math.min(a, b) }

	@expose(z.number(), z.number())
	static max(a: number, b: number) { return Math.max(a, b) }

	@expose(z.number())
	static round(x: number) { return Math.round(x) }

	@expose(z.number())
	static floor(x: number) { return Math.floor(x) }

	@expose(z.number())
	static ceil(x: number) { return Math.ceil(x) }

	@expose(z.number())
	static abs(x: number) { return Math.abs(x) }

	@expose(z.number())
	static sqrt(x: number) { return Math.sqrt(x) }

	@expose(z.number(), z.number())
	static pow(base: number, exp: number) { return base ** exp }

	@expose(z.number())
	static log(x: number) { return Math.log(x) }

	@expose()
	static random() { return Math.random() }

	@expose(z.number())
	static sign(x: number) { return Math.sign(x) }

	@expose(z.number())
	static trunc(x: number) { return Math.trunc(x) }
}

export class ExoPromise {
	@expose(z.array(z.any()))
	static all(values: unknown[]) { return Promise.all(values as Promise<unknown>[]) }

	@expose(z.array(z.any()))
	static allSettled(values: unknown[]) { return Promise.allSettled(values as Promise<unknown>[]) }

	@expose(z.array(z.any()))
	static race(values: unknown[]) { return Promise.race(values as Promise<unknown>[]) }

	@expose(z.any())
	static resolve(value: unknown) { return Promise.resolve(value) }

	@expose(z.any())
	static reject(reason: unknown) { return Promise.reject(reason) }
}

@expose(z.union([z.string(), z.number(), z.bigint()]))
export class ExoNumber implements IExoNumber {
	constructor(...args: Parameters<typeof Number>) {
		return new Number(...args)
	}

	@expose(z.number().optional())
	get toString() { return Number.prototype.toString }

	@expose(z.string(), z.number().optional())
	static parseInt(s: string, radix?: number) { return Number.parseInt(s, radix) }

	@expose(z.string())
	static parseFloat(s: string) { return Number.parseFloat(s) }

	@expose(z.any())
	static isNaN(value: unknown) { return Number.isNaN(value) }

	@expose(z.any())
	static isFinite(value: unknown) { return Number.isFinite(value) }

	@expose(z.any())
	static isInteger(value: unknown) { return Number.isInteger(value) }
}

// Static-only classes can't use `implements` — check with satisfies instead.
ExoJSON satisfies IExoJSON
ExoMath satisfies IExoMath
ExoPromise satisfies IExoPromise
