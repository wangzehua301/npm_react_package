import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";
import commonjs from '@rollup/plugin-commonjs';
import image from "@rollup/plugin-image";
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html'
import replace from '@rollup/plugin-replace';
import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "iife",
      exports: "auto",
      sourcemap: true,
      strict: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    commonjs(),
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': '"development"'
   }),
    sass({ insert: true }),
    typescript({ objectHashIgnoreUnknownHack: true }),
    image(),
    html({
      title: 'React Component Preview',
      publicPath: 'dist',
      template({ title }) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <script src="https://unpkg.com/react/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom/umd/react-dom.development.js">
        </head>
        <body>
          <div id="root"></div>
          <script src="index.js"></script>
        </body>
        </html>     
        `;
      },
    }),
    !production && serve('dist'),
    !production && livereload('dist'),
    production && terser(),
  ],
  external: [
    "react",
    "react-dom",
    "react-router-dom",
  ],
};