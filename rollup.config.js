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
      // {
      //   name: "Validator",
      //   file: "examples/index.js",
      //   format: "iife",
      //   sourcemap: true,
      //   globals: {
      //     "@babel/runtime-corejs3/helpers/classCallCheck": "_classCallCheck",
      //     "@babel/runtime-corejs3/helpers/createClass": "_createClass",
      //     "@babel/runtime-corejs3/helpers/typeof": "_typeof",
      //     "@babel/runtime-corejs3/helpers/slicedToArray": "_slicedToArray",
      //     "@babel/runtime-corejs3/core-js-stable/object/entries":
      //       "_Object$entries2",
      //     "@babel/runtime-corejs3/core-js-stable/object/keys": "_Object$keys",
      //     "@babel/runtime-corejs3/core-js-stable/instance/concat":
      //       "_concatInstanceProperty",
      //   },
      // },
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
