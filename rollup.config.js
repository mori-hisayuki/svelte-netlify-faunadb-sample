import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import html from "rollup-plugin-bundle-html"
import { terser } from 'rollup-plugin-terser';
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"
import typescriptCompiler from "typescript"
import sveltePreprocessor from "svelte-preprocess"
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: './dist/js/bundle.js'
	},
	plugins: [
		svelte({
			dev: !production,
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
			plugins: [
				autoprefixer()
			]
		}),
		typescript({ typescript: typescriptCompiler }),
		resolve(),
		commonjs(),
		!production && serve(),
		!production && livereload({ watch: "./dist" }),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
