import eslint from "@eslint/js";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "func-style": ["error", "expression"],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
    },
  },
  {
    ignores: ["dist/"],
  },
];
