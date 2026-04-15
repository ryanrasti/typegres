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
      eqeqeq: "error",
      curly: ["error", "all"],
      "no-undef": "off", // tsgo handles this
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
