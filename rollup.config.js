import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import html from 'rollup-plugin-bundle-html';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import dotenv from 'dotenv';
import typescript from 'rollup-plugin-typescript2';
import typescriptCompiler from 'typescript';
import sveltePreprocessor from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

dotenv.config();
const plugins = [
	svelte({
		dev: process.env.DEVELOP_MODE,
		css: false,
		preprocess: sveltePreprocessor(),
		emitCss: true
	}),
	html({
		template: "src/index.html",
		dest: "dist",
		filename: "index.html"
	}),
	postcss({
		extract: './dist/css/bundle.css',
		sourceMap: true,
		use: [
			['sass', {
			  includePaths: [
				'./theme',
				'./node_modules'
			  ]
			}]
		  ],
		plugins: [
			autoprefixer()
		]
	}),
	typescript({ typescript: typescriptCompiler }),
	resolve(),
	commonjs()
]

if (process.env.DEVELOP_MODE) {
	plugins.push(
		serve({
			contentBase: './dist',
			open: true
		}),
		livereload({ watch: "./dist" })
	);
} else {
	plugins.push(terser({ sourcemap: true }))
}


export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: './dist/js/bundle.js'
	},
	plugins,
	watch: {
		clearScreen: false
	}
};
