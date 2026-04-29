/**
 * Whitelists for exoeval — shared between the evaluator and the eslint rule.
 * Single source of truth: if exoeval adds a node type, the lint rule allows
 * it automatically.
 */

export const allowedExpressions = [
	'ArrayExpression',
	'ArrowFunctionExpression',
	'AwaitExpression',
	'BinaryExpression',
	'CallExpression',
	'ConditionalExpression',
	'Identifier',
	'Literal',
	'LogicalExpression',
	'MemberExpression',
	'NewExpression',
	'ObjectExpression',
	'TemplateLiteral',
	'UnaryExpression',
	'ChainExpression',
] as const

export const allowedStatements = [
	'BlockStatement',
	'EmptyStatement',
	'VariableDeclaration',
	'ExpressionStatement',
	'ReturnStatement',
	'IfStatement',
] as const

/** Allowed at module top-level (exoImport). */
export const allowedModuleDeclarations = [
	'ExportDefaultDeclaration',
] as const
