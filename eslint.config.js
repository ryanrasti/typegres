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
