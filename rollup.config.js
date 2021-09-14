import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import config from 'sapper/config/rollup.js';
import path from 'path';
import pkg from './package.json';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

// packages I added
import inlineSvg from 'rollup-plugin-inline-svg';
import sveltePreprocess from 'svelte-preprocess';
import alias from '@rollup/plugin-alias';

const preprocess = sveltePreprocess({
  postcss: true
});

const aliases = alias({
  resolve: ['.js', '.svelte', '.svg'],
  entries: [
  	{
  		find: '@root',
  		replacement: `${__dirname}/`
  	},
    {
      find: '@',
      replacement: `${__dirname}/src`
    },
    {
    	find: 'css',
    	replacement: `${__dirname}/scripts/css`
    },
    {
      find: 'icons',
      replacement: `${__dirname}/static/images/icons`
    }
  ]
})

//---
const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				preventAssignment: true,
				values:{
					'process.browser': true,
					'process.env.NODE_ENV': JSON.stringify(mode)
				},
			}),
			svelte({
				compilerOptions: {
					dev,
					hydratable: true,
				},
				preprocess
			}),
			url({
				sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
				publicPath: '/client/',
				exclude: ['**/*.svg']
			}),
			resolve({
				browser: true,
				extensions: [ '.mjs', '.js', '.jsx', '.json' ],
				dedupe: ['svelte']
			}),
			inlineSvg({
				removeSVGTagAttrs: true
			}),
			aliases,
			commonjs(),
			json(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				preventAssignment: true,
				values:{
					'process.browser': false,
					'process.env.NODE_ENV': JSON.stringify(mode)
				},
			}),
			svelte({
				compilerOptions: {
					dev,
					generate: 'ssr',
					hydratable: true,
				},
				preprocess,
				emitCss: false
			}),
			url({
				sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
				publicPath: '/client/',
				emitFiles: false, // already emitted by client build
				exclude: ['**/*.svg']
			}),
			resolve({
				extensions: [ '.mjs', '.js', '.jsx', '.json' ],
				dedupe: ['svelte']
			}),
			inlineSvg({
				removeSVGTagAttrs: true
			}),
			aliases,
			commonjs(),
			json()
		],
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
		preserveEntrySignatures: 'strict',
		onwarn,
	},

	// -> disabling service workers until i can clean up static assets
	// serviceworker: {
	// 	input: config.serviceworker.input(),
	// 	output: config.serviceworker.output(),
	// 	plugins: [
	// 		resolve(),
	// 		replace({
	// 			preventAssignment: true,
	// 			values:{
	// 				'process.browser': true,
	// 				'process.env.NODE_ENV': JSON.stringify(mode)
	// 			},
	// 		}),
	// 		commonjs(),
	// 		!dev && terser()
	// 	],
	// 	preserveEntrySignatures: false,
	// 	onwarn,
	// }
};
