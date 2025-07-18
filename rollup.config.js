// Rollup configuration for the **site** (i.e., playground) build of Typegres.
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/typegres.js",
      format: "es",
      sourcemap: true,
    },
    // External Node.js built-ins and packages that depend on them
    external: ["pg", "@electric-sql/pglite"],
    plugins: [
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/typegres.d.ts",
      format: "es",
    },
    external: ["kysely", "pg", "@electric-sql/pglite"],
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  },
];
