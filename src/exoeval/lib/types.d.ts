/**
 * Type interfaces for exoeval builtins. builtins.ts implements these.
 * Exos import type from this file for cap typing.
 *
 * Single source of truth — if builtins.ts drifts, TS catches it
 * via `implements`.
 */

export type IExoArray<T = unknown> = {
	readonly length: number
	map: <U>(callbackfn: (value: T, index: number, array: T[]) => U) => U[]
	filter: (predicate: (value: T, index: number, array: T[]) => boolean) => T[]
	reduce: (<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U) => U) & ((callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T) => T)
	reduceRight: (<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U) => U) & ((callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T) => T)
	find: (predicate: (value: T, index: number, array: T[]) => boolean) => T | undefined
	findIndex: (predicate: (value: T, index: number, array: T[]) => boolean) => number
	findLast: (predicate: (value: T, index: number, array: T[]) => boolean) => T | undefined
	findLastIndex: (predicate: (value: T, index: number, array: T[]) => boolean) => number
	some: (predicate: (value: T, index: number, array: T[]) => boolean) => boolean
	every: (predicate: (value: T, index: number, array: T[]) => boolean) => boolean
	flatMap: <U>(callback: (value: T, index: number, array: T[]) => U | U[]) => U[]
	forEach: (callbackfn: (value: T, index: number, array: T[]) => void) => void
	toSorted: (compareFn?: (a: T, b: T) => number) => T[]
	at: (index: number) => T | undefined
	slice: (start?: number, end?: number) => T[]
	join: (separator?: string) => string
	concat: (...items: T[][]) => T[]
	indexOf: (searchElement: T, fromIndex?: number) => number
	lastIndexOf: (searchElement: T, fromIndex?: number) => number
	includes: (searchElement: T) => boolean
	flat: (depth?: number) => unknown[]
	entries: () => IterableIterator<[number, T]>
	keys: () => IterableIterator<number>
	values: () => IterableIterator<T>
	toReversed: () => T[]
	toSpliced: (start: number, deleteCount?: number, ...items: T[]) => T[]
	with: (index: number, value: T) => T[]
	toString: () => string
	[n: number]: T
}

export type IExoString = {
	readonly length: number
	at: (index: number) => string | undefined
	charAt: (pos: number) => string
	charCodeAt: (index: number) => number
	codePointAt: (pos: number) => number | undefined
	concat: (...strings: string[]) => string
	endsWith: (searchString: string, endPosition?: number) => boolean
	includes: (searchString: string, position?: number) => boolean
	indexOf: (searchString: string, position?: number) => number
	lastIndexOf: (searchString: string, position?: number) => number
	padEnd: (maxLength: number, fillString?: string) => string
	padStart: (maxLength: number, fillString?: string) => string
	repeat: (count: number) => string
	replace: (searchValue: string, replaceValue: string) => string
	replaceAll: (searchValue: string, replaceValue: string) => string
	slice: (start?: number, end?: number) => string
	split: (separator: string, limit?: number) => string[]
	startsWith: (searchString: string, position?: number) => boolean
	substring: (start: number, end?: number) => string
	toLowerCase: () => string
	toUpperCase: () => string
	trim: () => string
	trimEnd: () => string
	trimStart: () => string
	toString: () => string
}

export type IExoNumber = {
	toString: (radix?: number) => string
}

export type IExoBoolean = {
	valueOf: () => boolean
	toString: () => string
}

export type IExoDate = {
	getTime: () => number
	getFullYear: () => number
	getMonth: () => number
	getDate: () => number
	getHours: () => number
	getMinutes: () => number
	getSeconds: () => number
	getMilliseconds: () => number
	toISOString: () => string
	toLocaleDateString: (locale?: string, options?: Record<string, string | boolean | undefined>) => string
	toLocaleTimeString: (locale?: string, options?: Record<string, string | boolean | undefined>) => string
	toLocaleString: (locale?: string, options?: Record<string, string | boolean | undefined>) => string
	valueOf: () => number
	toString: () => string
}

export type IExoObject = {
	keys: (o: object) => string[]
	values: (o: object) => unknown[]
	entries: (o: object) => [string, unknown][]
	fromEntries: (entries: [string, unknown][]) => Record<string, unknown>
}

export type IExoJSON = {
	parse: (text: string) => unknown
	stringify: (value: unknown, replacer?: null, space?: number) => string
}

export type IExoMath = {
	min: (a: number, b: number) => number
	max: (a: number, b: number) => number
	round: (x: number) => number
	floor: (x: number) => number
	ceil: (x: number) => number
	abs: (x: number) => number
	sqrt: (x: number) => number
	pow: (base: number, exp: number) => number
	log: (x: number) => number
	random: () => number
	sign: (x: number) => number
	trunc: (x: number) => number
}

export type IExoPromise = {
	all: (values: unknown[]) => Promise<unknown[]>
	allSettled: (values: unknown[]) => Promise<unknown>
	race: (values: unknown[]) => Promise<unknown>
	resolve: (value: unknown) => Promise<unknown>
	reject: (reason: unknown) => Promise<unknown>
}
