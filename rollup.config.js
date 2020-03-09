import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"
import typescriptCompiler from "typescript"
import sveltePreprocessor from "svelte-preprocess"

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			dev: !production,
			extensions: [".svelte"],
			css: css => {
                css.write('public/css/bundle.css');
            },
            // 下記追加
            preprocess: sveltePreprocessor({
                scss: true
            }),
			emitCss: true,
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		postcss({
			extract: true
		}),
		typescript({ typescript: typescriptCompiler }),
		commonjs(),
		!production && serve(),
		!production && livereload('public'),
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
