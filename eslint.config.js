import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "func-style": ["error", "expression"],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-undef": "off", // tsgo handles this
      "no-redeclare": "off", // tsgo handles this; flags valid TS overload signatures
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-syntax": ["error", {
        selector: "ImportExpression",
        message: "Use top-level imports. Dynamic import() is not allowed unless there is a real performance or correctness reason.",
      }, {
        selector: "CallExpression[callee.name='require']",
        message: "Use top-level imports. require() is not allowed.",
      }, {
        // Block computed-key mutation where the key is dynamic (a variable,
        // identifier, or symbol). `obj["foo"] = x` (literal key) is fine,
        // `obj[key] = x` (variable) is the proto-pollution risk.
        selector: "AssignmentExpression[left.type='MemberExpression'][left.computed=true][left.property.type!='Literal']",
        message: "Don't mutate via dynamic computed keys (proto-pollution risk). Use Object.fromEntries, a Map, or Object.defineProperty when you really mean it.",
      }, {
        // The literal case still needs guarding for __proto__ specifically —
        // both `obj.__proto__ = x` and `obj["__proto__"] = x` invoke the setter.
        selector: "AssignmentExpression[left.type='MemberExpression'][left.computed=false][left.property.name='__proto__']",
        message: "Don't assign to __proto__ — use Object.setPrototypeOf if you really mean it.",
      }, {
        selector: "AssignmentExpression[left.type='MemberExpression'][left.computed=true][left.property.value='__proto__']",
        message: "Don't assign to __proto__ — use Object.setPrototypeOf if you really mean it.",
      }],
      "@typescript-eslint/no-restricted-types": ["error", {
        types: {
          "Record": {
            message: "Use { [key: string]: T } instead. 'Record' conflicts with the pg Record type.",
          },
        },
      }],
    },
  },
  {
    ignores: ["dist/", "src/types/generated/"],
  },
];
