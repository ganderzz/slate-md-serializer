import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/slate-md-serializer.js",
    name: "slate-md-serializer",
    format: "umd"
  },
  plugins: [terser()]
};
