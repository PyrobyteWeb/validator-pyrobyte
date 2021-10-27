import {nodeResolve} from "@rollup/plugin-node-resolve";
import {babel} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";

export default [
  {
    input: './src/index.js',
    output: {
      name: 'validatorPyrobyte',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/**']
      }),
      terser()
    ]
  },
  {
    external: [/@babel\/runtime/],
    input: './src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        plugins: [terser({toplevel: true})],
      },
      {
        file: pkg.module,
        format: 'es',
        plugins: [terser({module: true})],
      },
    ],
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/**']
      })
    ]
  }
];
