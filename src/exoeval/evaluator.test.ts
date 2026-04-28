import { describe, expect, it } from 'vitest'
import z from 'zod'
import { exoEval } from './index'
import { tool } from './tool'

class MockCalc {
	@tool(z.number(), z.number())
	add(a: number, b: number): number { return a + b }
}

describe('exoEval', () => {
	it('literal (number)', () => {
		expect(exoEval('42')).toBe(42)
	})

	it('literal (string)', () => {
		expect(exoEval('"hello"')).toBe('hello')
	})

	it('literal (boolean)', () => {
		expect(exoEval('true')).toBe(true)
	})

	it('identifier (via const)', () => {
		expect(exoEval('const x = 1; x')).toBe(1)
	})

	it('memberExpression', () => {
		expect(exoEval('const o = { a: 2 }; o.a')).toBe(2)
	})

	it('callExpression', () => {
		expect(exoEval('const f = () => 3; f()')).toBe(3)
	})

	it('arrayExpression', () => {
		expect(exoEval('[1, 2, 3]')).toEqual([1, 2, 3])
	})

	it('objectExpression', () => {
		expect(exoEval('({ x: 4 })')).toEqual({ x: 4 })
	})

	it('objectExpression (computed key)', () => {
		expect(exoEval('const k = "a"; ({ [k]: 1 })')).toEqual({ a: 1 })
		expect(exoEval('const key = "b"; ({ [key]: 2 }).b')).toBe(2)
	})

	it('unaryExpression (!)', () => {
		expect(exoEval('!false')).toBe(true)
	})

	it('unaryExpression (typeof)', () => {
		expect(exoEval('typeof "x"')).toBe('string')
	})

	it('unaryExpression (void)', () => {
		expect(exoEval('void 0')).toBe(undefined)
		expect(exoEval('void "anything"')).toBe(undefined)
	})

	it('arrowFunctionExpression', () => {
		const fn = exoEval('() => 5') as () => number
		expect(fn()).toBe(5)
	})

	it('blockStatement', () => {
		expect(exoEval('{ 6 }')).toBe(6)
	})

	it('blockStatement (scope isolation)', () => {
		expect(exoEval('const x = 1; { const x = 2; x }')).toBe(2)
		expect(exoEval('const x = 1; { const x = 2; }; x')).toBe(1)
	})

	it('emptyStatement', () => {
		expect(exoEval(';')).toBeUndefined()
	})

	it('variableDeclaration', () => {
		expect(exoEval('const a = 7; a')).toBe(7)
	})

	it('expressionStatement', () => {
		expect(exoEval('8')).toBe(8)
	})

	it('returnStatement (inside arrow)', () => {
		const fn = exoEval('() => { return 9 }') as () => number
		expect(fn()).toBe(9)
	})

	it('returnStatement (no argument)', () => {
		const fn = exoEval('() => { return; }') as () => undefined
		expect(fn()).toBeUndefined()
	})

	it('returnStatement (early return: subsequent statements not executed)', () => {
		const fn = exoEval('() => { return 42; (() => { throw new Error("must not run"); })(); }') as () => number
		expect(fn()).toBe(42)
	})

	it('ifStatement (then)', () => {
		expect(exoEval('if (true) 10')).toBe(10)
	})

	it('ifStatement (else)', () => {
		expect(exoEval('if (false) 0; else 11')).toBe(11)
	})

	it('ifStatement (no else, condition false)', () => {
		expect(exoEval('if (false) 1')).toBeUndefined()
	})

	it('ifStatement short-circuits: then branch only when condition true', () => {
		expect(exoEval('if (true) 1; else (() => { throw new Error("else must not run"); })()')).toBe(1)
	})
	it('ifStatement short-circuits: else branch only when condition false', () => {
		expect(exoEval('if (false) (() => { throw new Error("then must not run"); })(); else 2')).toBe(2)
	})

	describe('binding (const)', () => {
		it('identifier', () => {
			expect(exoEval('const x = 1; x')).toBe(1)
		})
		it('array pattern', () => {
			expect(exoEval('const [a, b] = [10, 20]; [a, b]')).toEqual([10, 20])
		})
		it('array pattern with hole', () => {
			expect(exoEval('const [, , c] = [1, 2, 3]; c')).toBe(3)
		})
		it('array pattern with rest', () => {
			expect(exoEval('const [a, ...r] = [1, 2, 3]; r')).toEqual([2, 3])
		})
		it('object pattern (shorthand)', () => {
			expect(exoEval('const { a, b } = { a: 5, b: 6 }; [a, b]')).toEqual([5, 6])
		})
		it('object pattern (rename)', () => {
			expect(exoEval('const { a: x } = { a: 7 }; x')).toBe(7)
		})
		it('object pattern with rest', () => {
			expect(exoEval('const { a, ...r } = { a: 1, b: 2 }; r')).toEqual({ b: 2 })
		})
		it('object pattern (computed key)', () => {
			expect(exoEval('const k = "x"; const { [k]: v } = { x: 42 }; v')).toBe(42)
			expect(exoEval('const key = "foo"; const { [key]: val } = { foo: 10 }; val')).toBe(10)
		})
		it('assignment pattern (default)', () => {
			expect(exoEval('const [a = 0] = []; a')).toBe(0)
		})
		it('nested: object then array', () => {
			expect(exoEval('const { a: [x, y] } = { a: [1, 2] }; [x, y]')).toEqual([1, 2])
		})
		it('nested: array then object', () => {
			expect(exoEval('const [{ a }, b] = [{ a: 4 }, 5]; [a, b]')).toEqual([4, 5])
		})
	})

	describe('binding (fn args)', () => {
		it('identifier', () => {
			expect(exoEval('const f = (x) => x; f(42)')).toBe(42)
		})
		it('array pattern', () => {
			expect(exoEval('const f = ([a, b]) => [a, b]; f([1, 2])')).toEqual([1, 2])
		})
		it('object pattern', () => {
			expect(exoEval('const f = ({ a, b }) => [a, b]; f({ a: 10, b: 3 })')).toEqual([10, 3])
		})
		it('object pattern (computed key)', () => {
			expect(exoEval('const k = "a"; const f = ({ [k]: v }) => v; f({ a: 5 })')).toBe(5)
		})
		it('assignment pattern (default)', () => {
			expect(exoEval('const f = (x = 10) => x; f()')).toBe(10)
		})
		it('rest only', () => {
			expect(exoEval('const f = (...rest) => rest; f(1, 2, 3)')).toEqual([1, 2, 3])
		})
		it('rest with leading', () => {
			expect(exoEval('const f = (a, b, ...rest) => rest; f(1, 2, 3, 4)')).toEqual([3, 4])
		})
		it('nested: object then array', () => {
			expect(exoEval('const f = ({ a: [x, y] }) => [x, y]; f({ a: [10, 20] })')).toEqual([10, 20])
		})
	})

	describe('optional chaining (member ?.)', () => {
		it('returns property when object exists', () => {
			expect(exoEval('const o = { a: 1 }; o?.a')).toBe(1)
		})
		it('returns undefined when object is null', () => {
			expect(exoEval('const o = null; o?.a')).toBeUndefined()
		})
		it('returns undefined when object is undefined', () => {
			expect(exoEval('const o = undefined; o?.a')).toBeUndefined()
		})
		it('short-circuits: does not access property on null', () => {
			expect(exoEval('const o = null; o?.x')).toBeUndefined()
		})
		it('nested optional chain', () => {
			expect(exoEval('const o = { a: { b: 2 } }; o?.a?.b')).toBe(2)
			expect(exoEval('const o = { a: null }; o?.a?.b')).toBeUndefined()
		})
	})

	describe('optional call (?.)', () => {
		it('calls when callee is function', () => {
			expect(exoEval('const f = () => 3; f?.()')).toBe(3)
		})
		it('returns undefined when callee is null', () => {
			expect(exoEval('const f = null; f?.()')).toBeUndefined()
		})
		it('returns undefined when callee is undefined', () => {
			expect(exoEval('const f = undefined; f?.()')).toBeUndefined()
		})
		it('short-circuits: does not evaluate arguments when callee is null', () => {
			const fn = exoEval('const f = null; const side = () => { throw new Error("eval"); }; f?.(side())') as () => unknown
			expect(fn).toBeUndefined()
		})
		it('method optional call', () => {
			expect(exoEval('const o = { m: () => 4 }; o.m?.()')).toBe(4)
			expect(exoEval('const o = { m: null }; o.m?.()')).toBeUndefined()
		})
	})

	describe('conditional (ternary)', () => {
		it('consequent when test is true', () => {
			expect(exoEval('true ? 1 : 2')).toBe(1)
		})
		it('alternate when test is false', () => {
			expect(exoEval('false ? 1 : 2')).toBe(2)
		})
		it('falsy test uses alternate', () => {
			expect(exoEval('0 ? 1 : 2')).toBe(2)
			expect(exoEval('"" ? 1 : 2')).toBe(2)
			expect(exoEval('null ? 1 : 2')).toBe(2)
		})
		it('truthy non-boolean uses consequent', () => {
			expect(exoEval('1 ? 10 : 20')).toBe(10)
			expect(exoEval('"x" ? 10 : 20')).toBe(10)
		})
		it('nested ternary', () => {
			expect(exoEval('true ? false ? 1 : 2 : 3')).toBe(2)
			expect(exoEval('false ? 1 : true ? 4 : 5')).toBe(4)
		})
		it('short-circuits: consequent only when test truthy', () => {
			expect(exoEval('true ? 1 : (() => { throw new Error("alternate must not run"); })()')).toBe(1)
		})
		it('short-circuits: alternate only when test falsy', () => {
			expect(exoEval('false ? (() => { throw new Error("consequent must not run"); })() : 2')).toBe(2)
		})
	})

	describe('binary operators', () => {
		describe('equality', () => {
			it('===', () => {
				expect(exoEval('1 === 1')).toBe(true)
				expect(exoEval('1 === 2')).toBe(false)
				expect(exoEval('"a" === "a"')).toBe(true)
				expect(exoEval('null === null')).toBe(true)
			})
			it('!==', () => {
				expect(exoEval('1 !== 2')).toBe(true)
				expect(exoEval('1 !== 1')).toBe(false)
			})
			it('==', () => {
				expect(exoEval('1 == 1')).toBe(true)
				expect(exoEval('1 == "1"')).toBe(true)
			})
			it('!=', () => {
				expect(exoEval('1 != "1"')).toBe(false)
				expect(exoEval('1 != 2')).toBe(true)
			})
		})
		describe('comparison (numbers)', () => {
			it('< > <= >=', () => {
				expect(exoEval('2 < 3')).toBe(true)
				expect(exoEval('2 > 3')).toBe(false)
				expect(exoEval('3 <= 3')).toBe(true)
				expect(exoEval('4 >= 3')).toBe(true)
			})
		})
		describe('arithmetic', () => {
			it('+ - * / %', () => {
				expect(exoEval('2 + 3')).toBe(5)
				expect(exoEval('5 - 2')).toBe(3)
				expect(exoEval('2 * 3')).toBe(6)
				expect(exoEval('7 / 2')).toBe(3.5)
				expect(exoEval('7 % 2')).toBe(1)
			})
			it('**', () => {
				expect(exoEval('2 ** 8')).toBe(256)
			})
		})
		describe('bitwise', () => {
			it('<< >> >>>', () => {
				expect(exoEval('1 << 2')).toBe(4)
				expect(exoEval('8 >> 2')).toBe(2)
				expect(exoEval('1 >>> 0')).toBe(1)
			})
			it('& | ^', () => {
				expect(exoEval('5 & 3')).toBe(1)
				expect(exoEval('5 | 3')).toBe(7)
				expect(exoEval('5 ^ 3')).toBe(6)
			})
		})
	})

	describe('logical expression', () => {
		it('&&', () => {
			expect(exoEval('true && true')).toBe(true)
			expect(exoEval('true && false')).toBe(false)
			expect(exoEval('false && true')).toBe(false)
			expect(exoEval('1 && 2')).toBe(2)
			expect(exoEval('0 && 2')).toBe(0)
		})
		it('||', () => {
			expect(exoEval('false || true')).toBe(true)
			expect(exoEval('false || false')).toBe(false)
			expect(exoEval('1 || 2')).toBe(1)
			expect(exoEval('0 || 2')).toBe(2)
		})
		it('??', () => {
			expect(exoEval('null ?? 1')).toBe(1)
			expect(exoEval('undefined ?? 2')).toBe(2)
			expect(exoEval('0 ?? 1')).toBe(0)
			expect(exoEval('false ?? 1')).toBe(false)
		})
		it('short-circuits: && does not evaluate RHS when LHS is falsy', () => {
			expect(exoEval('false && (() => { throw new Error("RHS must not run"); })()')).toBe(false)
			expect(exoEval('0 && (() => { throw new Error("RHS must not run"); })()')).toBe(0)
		})
		it('short-circuits: || does not evaluate RHS when LHS is truthy', () => {
			expect(exoEval('true || (() => { throw new Error("RHS must not run"); })()')).toBe(true)
			expect(exoEval('1 || (() => { throw new Error("RHS must not run"); })()')).toBe(1)
		})
		it('short-circuits: ?? does not evaluate RHS when LHS is not null/undefined', () => {
			expect(exoEval('0 ?? (() => { throw new Error("RHS must not run"); })()')).toBe(0)
			expect(exoEval('false ?? (() => { throw new Error("RHS must not run"); })()')).toBe(false)
		})
	})

	describe('template literal', () => {
		it('only static parts', () => {
			expect(exoEval('`hello`')).toBe('hello')
		})
		it('expression as only element', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const x = 1; `${x}`')).toBe('1')
		})
		it('expression first (no leading quasi)', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const x = 2; `${x} world`')).toBe('2 world')
		})
		it('expression in middle', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const x = 3; `a ${x} b`')).toBe('a 3 b')
		})
		it('multiple expressions', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const a = 1; const b = 2; `${a}+${b}`')).toBe('1+2')
		})
		it('expression last', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const x = 4; `end ${x}`')).toBe('end 4')
		})
		it('number and boolean coerced to string', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('`${42} ${true}`')).toBe('42 true')
		})
		it('empty template', () => {
			expect(exoEval('``')).toBe('')
		})
		it('single expression only (no quasis either side)', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const x = "X"; `${x}`')).toBe('X')
		})
	})

	describe('edge cases', () => {
		it('optional chain on undefined then property access throws without ?.', () => {
			expect(() => exoEval('const o = undefined; o.x')).toThrow()
		})
		it('ternary with expressions in both branches (only one evaluated)', () => {
			expect(exoEval('true ? 1 + 1 : (() => { throw new Error("alternate must not run"); })()')).toBe(2)
			expect(exoEval('false ? (() => { throw new Error("consequent must not run"); })() : 2 + 2')).toBe(4)
		})
		it('binary + with only numbers', () => {
			expect(exoEval('10 + 20')).toBe(30)
		})
		it('binary + with strings concatenates', () => {
			expect(exoEval('"hello" + " " + "world"')).toBe('hello world')
			expect(exoEval('"x" + 1')).toBe('x1')
			expect(exoEval('1 + "x"')).toBe('1x')
		})
		it('logical with nested binary', () => {
			expect(exoEval('(1 < 2) && (3 > 2)')).toBe(true)
			expect(exoEval('(1 === 1) || (2 === 3)')).toBe(true)
		})
		it('template with ternary', () => {
			// eslint-disable-next-line no-template-curly-in-string
			expect(exoEval('const ok = true; `result: ${ok ? "yes" : "no"}`')).toBe('result: yes')
		})
		it('optional chain with computed property', () => {
			expect(exoEval('const o = { a: 1 }; const k = "a"; o?.[k]')).toBe(1)
			expect(exoEval('const o = null; const k = "a"; o?.[k]')).toBeUndefined()
		})
	})

	describe('array builtins', () => {
		it('arr.length', () => {
			expect(exoEval('[1, 2, 3].length')).toBe(3)
		})
		it('arr[0] still works', () => {
			expect(exoEval('[10, 20, 30][0]')).toBe(10)
		})
		it('arr.map', () => {
			expect(exoEval('[1, 2, 3].map((x) => x * 2)')).toEqual([2, 4, 6])
		})
		it('arr.filter', () => {
			expect(exoEval('[1, 2, 3, 4].filter((x) => x > 2)')).toEqual([3, 4])
		})
		it('arr.reduce', () => {
			expect(exoEval('[1, 2, 3].reduce((acc, x) => acc + x, 0)')).toBe(6)
		})
		it('arr.find', () => {
			expect(exoEval('[1, 2, 3].find((x) => x > 1)')).toBe(2)
		})
		it('arr.some', () => {
			expect(exoEval('[1, 2, 3].some((x) => x > 2)')).toBe(true)
		})
		it('arr.every', () => {
			expect(exoEval('[1, 2, 3].every((x) => x > 0)')).toBe(true)
		})
		it('arr.includes', () => {
			expect(exoEval('[1, 2, 3].includes(2)')).toBe(true)
			expect(exoEval('[1, 2, 3].includes(5)')).toBe(false)
		})
		it('arr.indexOf', () => {
			expect(exoEval('[1, 2, 3].indexOf(2)')).toBe(1)
		})
		it('arr.join', () => {
			expect(exoEval('[1, 2, 3].join("-")')).toBe('1-2-3')
		})
		it('arr.slice', () => {
			expect(exoEval('[1, 2, 3, 4].slice(1, 3)')).toEqual([2, 3])
		})
		it('arr.at', () => {
			expect(exoEval('[10, 20, 30].at(-1)')).toBe(30)
		})
		it('arr.flat', () => {
			expect(exoEval('[[1, 2], [3, 4]].flat()')).toEqual([1, 2, 3, 4])
		})
		it('chained: filter then map', () => {
			expect(exoEval('[1, 2, 3, 4].filter((x) => x > 1).map((x) => x * 2)')).toEqual([4, 6, 8])
		})
	})

	describe('string builtins', () => {
		it('str.length', () => {
			expect(exoEval('"hello".length')).toBe(5)
		})
		it('str.toUpperCase', () => {
			expect(exoEval('"hello".toUpperCase()')).toBe('HELLO')
		})
		it('str.toLowerCase', () => {
			expect(exoEval('"Hello".toLowerCase()')).toBe('hello')
		})
		it('str.slice', () => {
			expect(exoEval('"hello".slice(1, 3)')).toBe('el')
		})
		it('str.split', () => {
			expect(exoEval('"a,b,c".split(",")')).toEqual(['a', 'b', 'c'])
		})
		it('str.includes', () => {
			expect(exoEval('"hello world".includes("world")')).toBe(true)
		})
		it('str.startsWith', () => {
			expect(exoEval('"hello".startsWith("hel")')).toBe(true)
		})
		it('str.endsWith', () => {
			expect(exoEval('"hello".endsWith("llo")')).toBe(true)
		})
		it('str.trim', () => {
			expect(exoEval('"  hello  ".trim()')).toBe('hello')
		})
		it('str.indexOf', () => {
			expect(exoEval('"hello".indexOf("ll")')).toBe(2)
		})
		it('str.replace', () => {
			expect(exoEval('"hello world".replace("world", "there")')).toBe('hello there')
		})
		it('str.repeat', () => {
			expect(exoEval('"ab".repeat(3)')).toBe('ababab')
		})
		it('str.charAt', () => {
			expect(exoEval('"hello".charAt(1)')).toBe('e')
		})
		it('str.at', () => {
			expect(exoEval('"hello".at(-1)')).toBe('o')
		})
		it('str.padStart', () => {
			expect(exoEval('"5".padStart(3, "0")')).toBe('005')
		})
		it('str.substring', () => {
			expect(exoEval('"hello".substring(1, 4)')).toBe('ell')
		})
	})

	describe('object builtins', () => {
		it('object.keys', () => {
			expect(exoEval('Object.keys({ a: 1, b: 2 })')).toEqual(['a', 'b'])
		})
		it('object.values', () => {
			expect(exoEval('Object.values({ a: 1, b: 2 })')).toEqual([1, 2])
		})
		it('object.entries', () => {
			expect(exoEval('Object.entries({ a: 1 })')).toEqual([['a', 1]])
		})
	})

	describe('date builtins', () => {
		it('new Date with string', () => {
			expect(exoEval('const d = new Date("2024-01-15T12:00:00Z"); d.getFullYear()')).toBe(2024)
		})
		it('date methods', () => {
			expect(exoEval('const d = new Date("2024-06-15T10:30:45Z"); d.getMonth()')).toBe(5)
			expect(exoEval('const d = new Date("2024-06-15T10:30:45Z"); d.getDate()')).toBe(15)
		})
		it('date.now returns a number', () => {
			const result = exoEval('Date.now()') as number
			expect(typeof result).toBe('number')
		})
		it('toISOString', () => {
			expect(exoEval('const d = new Date("2024-01-01T00:00:00Z"); d.toISOString()')).toBe('2024-01-01T00:00:00.000Z')
		})
		it('toLocaleDateString with locale and options', () => {
			expect(exoEval('const d = new Date("2024-01-15T12:00:00Z"); d.toLocaleDateString("en-US", { month: "long" })')).toContain('January')
		})
	})

	describe('JSON builtins', () => {
		it('JSON.parse', () => {
			expect(exoEval('JSON.parse(\'{"a":1,"b":2}\')')).toEqual({ a: 1, b: 2 })
		})
		it('JSON.parse array', () => {
			expect(exoEval('JSON.parse("[1,2,3]")')).toEqual([1, 2, 3])
		})
		it('JSON.stringify', () => {
			expect(exoEval('JSON.stringify({ a: 1 })')).toBe('{"a":1}')
		})
		it('JSON.stringify with indent', () => {
			expect(exoEval('JSON.stringify({ a: 1 }, null, 2)')).toBe('{\n  "a": 1\n}')
		})
		it('JSON.parse then access', () => {
			expect(exoEval('const obj = JSON.parse(\'{"x":42}\'); obj.x')).toBe(42)
		})
		it('roundtrip', () => {
			expect(exoEval('JSON.parse(JSON.stringify([1, "two", true]))')).toEqual([1, 'two', true])
		})
	})

	describe('Math builtins', () => {
		it('Math.min', () => {
			expect(exoEval('Math.min(3, 7)')).toBe(3)
		})
		it('Math.max', () => {
			expect(exoEval('Math.max(3, 7)')).toBe(7)
		})
		it('Math.round', () => {
			expect(exoEval('Math.round(4.6)')).toBe(5)
			expect(exoEval('Math.round(4.4)')).toBe(4)
		})
		it('Math.floor', () => {
			expect(exoEval('Math.floor(4.9)')).toBe(4)
		})
		it('Math.ceil', () => {
			expect(exoEval('Math.ceil(4.1)')).toBe(5)
		})
		it('Math.abs', () => {
			expect(exoEval('Math.abs(-5)')).toBe(5)
		})
		it('Math.sqrt', () => {
			expect(exoEval('Math.sqrt(9)')).toBe(3)
		})
		it('Math.pow', () => {
			expect(exoEval('Math.pow(2, 10)')).toBe(1024)
		})
		it('Math.log', () => {
			expect(exoEval('Math.log(1)')).toBe(0)
		})
		it('Math.random returns number in [0,1)', () => {
			const result = exoEval('Math.random()') as number
			expect(typeof result).toBe('number')
			expect(result).toBeGreaterThanOrEqual(0)
			expect(result).toBeLessThan(1)
		})
		it('Math.sign', () => {
			expect(exoEval('Math.sign(-10)')).toBe(-1)
			expect(exoEval('Math.sign(0)')).toBe(0)
			expect(exoEval('Math.sign(10)')).toBe(1)
		})
		it('Math.trunc', () => {
			expect(exoEval('Math.trunc(4.9)')).toBe(4)
			expect(exoEval('Math.trunc(-4.9)')).toBe(-4)
		})
	})

	describe('Number builtins', () => {
		it('Number.parseInt', () => {
			expect(exoEval('Number.parseInt("42")')).toBe(42)
		})
		it('Number.parseInt with radix', () => {
			expect(exoEval('Number.parseInt("ff", 16)')).toBe(255)
		})
		it('Number.parseFloat', () => {
			expect(exoEval('Number.parseFloat("3.14")')).toBeCloseTo(3.14)
		})
		it('Number.isNaN', () => {
			expect(exoEval('Number.isNaN(0 / 0)')).toBe(true)
			expect(exoEval('Number.isNaN(42)')).toBe(false)
		})
		it('Number.isFinite', () => {
			expect(exoEval('Number.isFinite(42)')).toBe(true)
			expect(exoEval('Number.isFinite(1 / 0)')).toBe(false)
		})
		it('Number.isInteger', () => {
			expect(exoEval('Number.isInteger(42)')).toBe(true)
			expect(exoEval('Number.isInteger(42.5)')).toBe(false)
		})
	})

	describe('Object.fromEntries safety', () => {
		it('blocks __proto__ key', () => {
			expect(() => exoEval('Object.fromEntries([["__proto__", {}]])')).toThrow(/__proto__/)
		})
		it('blocks constructor key', () => {
			expect(() => exoEval('Object.fromEntries([["constructor", {}]])')).toThrow(/constructor/)
		})
		it('valid fromEntries works', () => {
			expect(exoEval('Object.fromEntries([["a", 1], ["b", 2]])')).toEqual({ a: 1, b: 2 })
		})
		it('roundtrip entries/fromEntries', () => {
			expect(exoEval('Object.fromEntries(Object.entries({ x: 10, y: 20 }))')).toEqual({ x: 10, y: 20 })
		})
	})

	describe('Object.prototype fields are not accessible', () => {
		const blockedFields = ['constructor', '__proto__']

		for (const field of Object.getOwnPropertyNames(Object.prototype)) {
			if (blockedFields.includes(field)) {
				it(`${field} throws on access`, () => {
					expect(() => exoEval(`({}).${field}`)).toThrow(new RegExp(`${field}.*not allowed`))
					expect(() => exoEval(`({})["${field}"]`)).toThrow(new RegExp(`${field}.*not allowed`))
				})
				it(`${field} throws on assignment`, () => {
					expect(() => exoEval(`({ ${field}: 1 })`)).toThrow(new RegExp(`${field}.*not allowed`))
					expect(() => exoEval(`({ ["${field}"]: 1 })`)).toThrow(new RegExp(`${field}.*not allowed`))
				})
			}
			else {
				it(`${field} returns undefined on access`, () => {
					expect(exoEval(`({}).${field}`)).toBeUndefined()
					expect(exoEval(`({})["${field}"]`)).toBeUndefined()
				})
				it(`${field} is allowed in object literal`, () => {
					expect(exoEval(`({ ${field}: 1 }).${field}`)).toBe(1)
					expect(exoEval(`({ ["${field}"]: 1 })["${field}"]`)).toBe(1)
				})
			}
		}
	})

	describe('Function.prototype fields are not accessible', () => {
		const blockedFields = ['constructor', '__proto__']

		for (const field of Object.getOwnPropertyNames(Function.prototype)) {
			if (blockedFields.includes(field)) {
				it(`${field} throws on access`, () => {
					expect(() => exoEval(`(() => {}).${field}`)).toThrow(new RegExp(`${field}.*not allowed`))
					expect(() => exoEval(`(() => {})["${field}"]`)).toThrow(new RegExp(`${field}.*not allowed`))
				})
			}
			else {
				it(`${field} returns undefined on access`, () => {
					expect(exoEval(`(() => {}).${field}`)).toBeUndefined()
					expect(exoEval(`(() => {})["${field}"]`)).toBeUndefined()
				})
			}
		}
	})

	describe('Prototype pollution via spread', () => {
		it('blocks __proto__ key from JSON.parse in spread', () => {
			// secure-json-parse throws its own error for __proto__
			expect(() => exoEval('({ ...JSON.parse(\'{"__proto__": {"pwned": true}}\') })')).toThrow(/(__proto__|forbidden prototype)/)
		})
		it('blocks constructor key from JSON.parse in spread', () => {
			expect(() => exoEval('({ ...JSON.parse(\'{"constructor": "evil"}\') })')).toThrow(/constructor.*not allowed/)
		})
	})

	describe('Prototype pollution via crafted object', () => {
		it('blocks __proto__ key in spread', () => {
			// Create object with __proto__ as an own enumerable property using Object.defineProperty
			const malicious = Object.defineProperty({}, '__proto__', {
				value: { pwned: true },
				enumerable: true,
			})
			// Use code-mode to test passing in external objects
			const fn = exoEval('(obj) => ({ ...obj })') as (obj: object) => object
			expect(() => fn(malicious)).toThrow(/__proto__.*not allowed/)
		})
		it('blocks constructor key in spread', () => {
			const malicious = Object.defineProperty({}, 'constructor', {
				value: 'evil',
				enumerable: true,
			})
			const fn = exoEval('(obj) => ({ ...obj })') as (obj: object) => object
			expect(() => fn(malicious)).toThrow(/constructor.*not allowed/)
		})
	})

	describe('Class prototype access', () => {
		it('Array.prototype returns undefined', () => {
			expect(exoEval('Array.prototype')).toBeUndefined()
		})
		it('String.prototype returns undefined', () => {
			expect(exoEval('String.prototype')).toBeUndefined()
		})
		it('Date.prototype returns undefined', () => {
			expect(exoEval('Date.prototype')).toBeUndefined()
		})
		it('Object.prototype returns undefined', () => {
			expect(exoEval('Object.prototype')).toBeUndefined()
		})
	})

	describe('Dangerous Object methods are not exposed', () => {
		const dangerousMethods = [
			'getPrototypeOf',
			'setPrototypeOf',
			'defineProperty',
			'getOwnPropertyDescriptor',
			'create',
			'assign',
		]
		for (const method of dangerousMethods) {
			it(`Object.${method} returns undefined`, () => {
				expect(exoEval(`Object.${method}`)).toBeUndefined()
			})
		}
	})

	describe('Globals are not accessible', () => {
		const globals = [
			'globalThis',
			'window',
			'global',
			'self',
			'process',
			'require',
			'module',
			'exports',
			'__dirname',
			'__filename',
			'eval',
			'Function',
			'Proxy',
			'Reflect',
			'Symbol',
			'Error',
			'setTimeout',
			'setInterval',
			'Buffer',
			'RegExp',
		]
		for (const name of globals) {
			it(`${name} is not defined`, () => {
				expect(() => exoEval(name)).toThrow(/variable is not defined/)
			})
		}
	})

	describe('Dangerous statements are blocked', () => {
		const blocked = [
			['for loop', 'for (let i = 0; i < 10; i++) {}'],
			['while loop', 'while (true) {}'],
			['do-while', 'do {} while (true)'],
			['try-catch', 'try { } catch (e) { }'],
			['throw', 'throw new Error("test")'],
			['class declaration', 'class Foo {}'],
			['function declaration', 'function foo() {}'],
			['with statement', 'with ({}) {}'],
			['debugger', 'debugger'],
			['let declaration', 'let x = 1'],
			['var declaration', 'var x = 1'],
		]
		for (const [name, code] of blocked) {
			it(`${name} is blocked`, () => {
				expect(() => exoEval(code)).toThrow()
			})
		}
	})

	describe('Dangerous expressions are blocked', () => {
		const blocked = [
			['delete operator', 'const o = {a:1}; delete o.a'],
			['this expression', 'this'],
			['assignment expression', 'const o = {a:1}; o.a = 2'],
			['update expression', 'const o = {a:1}; o.a++'],
			['sequence expression', '(1, 2, 3)'],
			['tagged template', 'const t = (s) => s; t`test`'],
			['getter in object literal', '({ get x() { return 1 } })'],
			['setter in object literal', '({ set x(v) { } })'],
		]
		for (const [name, code] of blocked) {
			it(`${name} is blocked`, () => {
				expect(() => exoEval(code)).toThrow()
			})
		}
	})

	describe('Thenable objects cannot be created', () => {
		it('then property in object literal throws', () => {
			expect(() => exoEval('({ then: (r) => r(1) })')).toThrow(/then.*not allowed/)
		})
		it('then property access throws', () => {
			expect(() => exoEval('const o = {}; o.then')).toThrow(/then.*not allowed/)
		})
	})

	describe('Regex literals are inert', () => {
		it('regex literal parses', () => {
			expect(exoEval('/test/')).toBeInstanceOf(RegExp)
		})
		it('regex.test() cannot be called', () => {
			expect(() => exoEval('/test/.test("test")')).toThrow(/callee is not a toolable function/)
		})
		it('regex.exec() cannot be called', () => {
			expect(() => exoEval('/test/.exec("test")')).toThrow(/callee is not a toolable function/)
		})
	})

	describe('bindings', () => {
		it('injects bindings into scope', () => {
			expect(exoEval('x', { x: 42 })).toBe(42)
		})

		it('injected @tool() objects are callable', () => {
			expect(exoEval('calc.add(1, 2)', { calc: new MockCalc() })).toBe(3)
		})

		it('bindings do not shadow builtins unless explicitly provided', () => {
			expect(exoEval('JSON.stringify(x)', { x: { a: 1 } })).toBe('{"a":1}')
		})
	})
})
