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
      "no-undef": "off",
    },
  },
  {
    ignores: ["dist/", "src/types/generated/"],
  },
];
