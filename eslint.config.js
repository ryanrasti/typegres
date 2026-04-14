import eslint from "@eslint/js";
import tsparser from "@typescript-eslint/parser";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
    },
    rules: {
      "func-style": ["error", "expression"],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
      curly: ["error", "all"],
      "no-undef": "off",
      "no-unused-vars": "off", // tsgo handles this; base rule doesn't understand TS type params
    },
  },
  {
    ignores: ["dist/", "src/types/generated/"],
  },
];
