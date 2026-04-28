import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { exoEval } from './index'
import { fn, isToolableFunction, tool, toolFieldsSymbol, toolSymbol } from './tool'

class SampleToolset {
	value = 10

	// Function-valued field that is not a tool
	fnField = (x: number) => this.value + x

	// Plain instance method, not a tool
	plainAdd(x: number, y: number) {
		return x + y
	}

	@tool(z.number(), z.number())
	add(x: number, y: number) {
		return this.value + x + y
	}

	@tool()
	getValue() {
		return this.value
	}
}

describe('tool decorator with class instances', () => {
	it('decorated methods are toolable functions on prototype', () => {
		const instance = new SampleToolset()
		expect(isToolableFunction(instance.add)).toBe(true)
		expect(isToolableFunction(instance.getValue)).toBe(true)
		expect(isToolableFunction(instance.plainAdd)).toBe(false)
	})

	it('exoEval can call a tool on an instance argument', () => {
		const instance = new SampleToolset()
		const fn = exoEval('(c) => c.add(1, 2)') as (c: SampleToolset) => number
		expect(fn(instance)).toBe(13)
	})

	it('exoEval cannot call non-tool methods', () => {
		const instance = new SampleToolset()
		const fn = exoEval('(c) => c.plainAdd(1, 2)') as (c: SampleToolset) => number
		expect(() => fn(instance)).toThrow(/callee is not a toolable function/)
	})

	it('accessing a field that isn\'t a tool returns undefined', () => {
		const instance = new SampleToolset()
		const fn = exoEval('(c) => c.value') as (c: SampleToolset) => number
		expect(fn(instance)).toBe(undefined)
	})

	it('method runtime arg validation rejects invalid args (direct and exoEval)', () => {
		const instance = new SampleToolset()
		expect(() => instance.add(1, 'not a number' as any)).toThrow(/Invalid value/)
		const run = exoEval('(c) => c.add(1, "not a number")') as (c: SampleToolset) => number
		expect(() => run(instance)).toThrow(/Invalid value/)
		expect(instance.add(1, 2)).toBe(13)
		expect((exoEval('(c) => c.add(1, 2)') as (c: SampleToolset) => number)(instance)).toBe(13)
	})
})

describe('getter decorator', () => {
	class WithGetters {
		private data = [1, 2, 3]

		@tool()
		get length() { return this.data.length }

		@tool(fn.returns(z.any()))
		get map() { return this.data.map.bind(this.data) }

		// Non-tool getter
		get raw() { return this.data }
	}

	it('getter with toolSymbol is accessible via exoEval', () => {
		const instance = new WithGetters()
		const lengthFn = exoEval('(c) => c.length') as (c: WithGetters) => number
		expect(lengthFn(instance)).toBe(3)
	})

	it('getter returning function is wrapped as toolable', () => {
		const instance = new WithGetters()
		const fn = exoEval('(c) => c.map((x) => x * 10)') as (c: WithGetters) => number[]
		expect(fn(instance)).toEqual([10, 20, 30])
	})

	it('non-tool getter is not accessible', () => {
		const instance = new WithGetters()
		const fn = exoEval('(c) => c.raw') as (c: WithGetters) => number[]
		expect(fn(instance)).toBeUndefined()
	})

	it('getter function has toolSymbol', () => {
		const desc = Object.getOwnPropertyDescriptor(WithGetters.prototype, 'length')
		expect(desc?.get).toBeDefined()
		expect((desc!.get as any)[toolSymbol]).toBe('raw')
	})

	it('non-tool getter does not have toolSymbol', () => {
		const desc = Object.getOwnPropertyDescriptor(WithGetters.prototype, 'raw')
		expect(desc?.get).toBeDefined()
		expect((desc!.get as any)[toolSymbol]).toBeUndefined()
	})

	it('getter-returned function runtime validation rejects invalid callback result (direct and exoEval)', () => {
		class WithValidatedMap {
			private data = [1, 2, 3]
			@tool(fn.returns(z.array(z.number())))
			get map() { return this.data.map.bind(this.data) }
		}
		const instance = new WithValidatedMap()
		expect(() => instance.map(() => 'not a number' as any)).toThrow(/Invalid value/)
		const run = exoEval('(c) => c.map(() => "not a number")') as (c: WithValidatedMap) => unknown
		expect(() => run(instance)).toThrow(/Invalid value/)
		// Valid: callback return value is validated per element; return [x] satisfies z.array(z.number())
		expect(instance.map((x: number) => [x])).toEqual([[1], [2], [3]])
		expect((exoEval('(c) => c.map((x) => [x])') as (c: WithValidatedMap) => unknown)(instance)).toEqual([[1], [2], [3]])
	})
})

describe('class decorator', () => {
	@tool(z.any().optional())
	class Constructable {
		readonly value: number
		constructor(value?: number) {
			this.value = value ?? 42
		}

		@tool()
		get val() { return this.value }
	}

	it('class is marked toolable', () => {
		expect((Constructable as any)[toolSymbol]).toBe('constructor')
	})

	it('new expression works in exoEval', () => {
		const fn = exoEval('(C) => { const c = new C(10); return c.val }') as (c: typeof Constructable) => number
		expect(fn(Constructable)).toBe(10)
	})

	it('new expression with no args', () => {
		const fn = exoEval('(C) => { const c = new C(); return c.val }') as (c: typeof Constructable) => number
		expect(fn(Constructable)).toBe(42)
	})

	it('non-toolable class cannot be constructed', () => {
		class NotToolable {}
		expect(() => {
			const fn = exoEval('(C) => new C()') as (c: typeof NotToolable) => NotToolable
			fn(NotToolable)
		}).toThrow(/constructor is not a toolable class/)
	})

	it('class constructor runtime arg validation rejects invalid args (direct and exoEval)', () => {
		@tool(z.number())
		class NumOnly {
			constructor(public n: number) {}
		}
		expect(() => new NumOnly('not a number' as any)).toThrow(/Invalid value/)
		const run = exoEval('(C) => new C("not a number")') as (c: typeof NumOnly) => NumOnly
		expect(() => run(NumOnly)).toThrow(/Invalid value/)
		expect(new NumOnly(42).n).toBe(42)
		expect((exoEval('(C) => new C(42)') as (C: typeof NumOnly) => NumOnly)(NumOnly).n).toBe(42)
	})
})

describe('field decorator', () => {
	class WithFields {
		@tool()
		label = 'hello'

		@tool(z.number())
		compute = (x: number) => x * 2

		plain = 'not a tool'
	}

	it('tool field is in toolFieldsSymbol set', () => {
		const instance = new WithFields()
		const fields = (instance as any)[toolFieldsSymbol] as Set<string>
		expect(fields).toBeInstanceOf(Set)
		expect(fields.has('label')).toBe(true)
		expect(fields.has('compute')).toBe(true)
		expect(fields.has('plain')).toBe(false)
	})

	it('tool field is accessible via exoEval', () => {
		const instance = new WithFields()
		const fn = exoEval('(c) => c.label') as (c: WithFields) => string
		expect(fn(instance)).toBe('hello')
	})

	it('tool function field is callable via exoEval', () => {
		const instance = new WithFields()
		const fn = exoEval('(c) => c.compute(5)') as (c: WithFields) => number
		expect(fn(instance)).toBe(10)
	})

	it('non-tool field is not accessible', () => {
		const instance = new WithFields()
		const fn = exoEval('(c) => c.plain') as (c: WithFields) => string
		expect(fn(instance)).toBeUndefined()
	})

	it('field function runtime arg validation rejects invalid args (direct and exoEval)', () => {
		const instance = new WithFields()
		expect(() => instance.compute('not a number' as any)).toThrow(/Invalid value/)
		const run = exoEval('(c) => c.compute("not a number")') as (c: WithFields) => number
		expect(() => run(instance)).toThrow(/Invalid value/)
		expect(instance.compute(5)).toBe(10)
		expect((exoEval('(c) => c.compute(5)') as (c: WithFields) => number)(instance)).toBe(10)
	})
})

describe('static decorator', () => {
	class WithStatics {
		@tool(z.number(), z.number())
		static add(a: number, b: number) { return a + b }

		@tool()
		static get name2() { return 'test' }
	}

	it('static method is toolable', () => {
		expect(isToolableFunction(WithStatics.add)).toBe(true)
	})

	it('static method callable via exoEval', () => {
		const fn = exoEval('(C) => C.add(3, 4)') as (c: typeof WithStatics) => number
		expect(fn(WithStatics)).toBe(7)
	})

	it('static getter accessible via exoEval', () => {
		const fn = exoEval('(C) => C.name2') as (c: typeof WithStatics) => string
		expect(fn(WithStatics)).toBe('test')
	})

	it('static method runtime arg validation rejects invalid args (direct and exoEval)', () => {
		expect(() => WithStatics.add(3, 'four' as any)).toThrow(/Invalid value/)
		const run = exoEval('(C) => C.add(3, "four")') as (c: typeof WithStatics) => number
		expect(() => run(WithStatics)).toThrow(/Invalid value/)
		expect(WithStatics.add(3, 4)).toBe(7)
		const run2 = exoEval('(C) => C.add(3, 4)') as (c: typeof WithStatics) => number
		expect(run2(WithStatics)).toBe(7)
	})
})

describe('@tool type checking', () => {
	it('rejects schema/method type mismatches', () => {
		// These should all produce TypeScript errors.
		// If the @ts-expect-error is unnecessary (no error), the test itself fails.

		class _TypeChecks {
			// @ts-expect-error — z.string() does not match number parameter
			@tool(z.string())
			numMethod(x: number) { return x }

			// @ts-expect-error — too few schemas (expects 2 args, only 1 schema)
			@tool(z.number())
			twoArgs(a: number, b: number) { return a + b }

			// @ts-expect-error — wrong schema type for second param
			@tool(z.number(), z.boolean())
			stringSecond(a: number, b: string) { return `${a}${b}` }
		}
	})
})

describe('tool with function argument', () => {
	it('can pass arrow function from exoeval to @tool method', () => {
		class EventSource {
			callbacks: Array<(x: number) => number> = []
			@tool(z.any())
			onEvent(cb: (x: number) => number) {
				this.callbacks.push(cb)
			}
		}
		const es = new EventSource()
		exoEval('es.onEvent((x) => x + 1)', { es })
		expect(es.callbacks.length).toBe(1)
		expect(es.callbacks[0](5)).toBe(6)
	})
})
