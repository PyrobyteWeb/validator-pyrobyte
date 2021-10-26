import {nodeResolve} from "@rollup/plugin-node-resolve";
import {babel} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from './package.json';

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
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      })
    ]
  },
  {
    input: './src/index.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'},
    ],
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      })
    ]
  }
];
