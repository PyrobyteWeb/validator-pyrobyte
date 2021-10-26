import {nodeResolve} from "@rollup/plugin-node-resolve";
import {babel} from "@rollup/plugin-babel";

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    babel({babelHelpers: 'bundled'})
  ]
};
