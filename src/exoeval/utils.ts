import type * as acorn from 'acorn'

export const disallowedProperties = new Set(['__proto__', 'constructor', 'toJSON', 'then'])

export const formatCodeMessage = (
	code: string,
	position: number,
	message: string,
): string => {
	// Find the line containing the position
	const lines = code.split('\n')
	let currentPos = 0
	let lineNumber = 0
	let columnNumber = 0

	for (let i = 0; i < lines.length; i++) {
		const lineLength = lines[i].length + 1 // +1 for newline
		if (currentPos + lineLength > position) {
			lineNumber = i
			columnNumber = position - currentPos
			break
		}
		currentPos += lineLength
	}

	const line = lines[lineNumber] ?? ''
	const pointer = `${' '.repeat(columnNumber)}^`

	return `${message}\n  ${lineNumber + 1} | ${line}\n    | ${pointer}`
}

export class Invariant {
	constructor(private readonly code: string) {}

	parse(
		condition: boolean,
		message: string,
		node: acorn.Node,
	): asserts condition {
		if (!condition) {
			throw new Error(formatCodeMessage(this.code, node.start, `Parse error: ${message}`))
		}
	}

	eval(
		condition: boolean,
		message: string,
		node: acorn.Node,
		value: unknown,
	): asserts condition {
		if (!condition) {
			const valueStr = JSON.stringify(value)
			throw new Error(formatCodeMessage(this.code, node.start, `Eval error: ${message} (value: ${valueStr})`))
		}
	}
}
