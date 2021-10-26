import {nodeResolve} from "@rollup/plugin-node-resolve";
import {babel} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({babelHelpers: 'bundled'})
  ]
};
