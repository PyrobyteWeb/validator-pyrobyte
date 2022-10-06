import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  {
    external: [/@babel\/runtime/],
    input: "./src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        plugins: [terser({ toplevel: true })],
      },
      {
        file: pkg.module,
        format: "es",
        plugins: [terser({ module: true })],
      },
    ],
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: "runtime",
        exclude: ["node_modules/**"],
      }),
    ],
  },
  {
    input: "./src/index.d.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
