import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import config from 'sapper/config/rollup.js';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import svg from 'rollup-plugin-svg';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

// packages I added
import sveltePreprocess from 'svelte-preprocess';
import alias from 'rollup-plugin-alias';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

const preprocess = [
  sveltePreprocess({
    scss: {
      includePaths: [
        'static/stylesheets',
        'node_modules/bourbon/core',
        'node_modules/include-media/dist'
      ]
    },
    postcss: {
      plugins: [require('autoprefixer')]
    }
  })
];

const aliases = alias({
  resolve: ['.js', '.svelte', '.svg'],
  entries: [
    {
      find: '@',
      replacement: `${__dirname}/src`
    },
    {
      find: 'icons',
      replacement: `${__dirname}/static/images/icons`
    }
  ]
})

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
      svg(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
        preprocess
			}),
			resolve({
				browser: true,
        extensions: [ '.mjs', '.js', '.jsx', '.json', '.svg' ],
				dedupe
			}),
      aliases,
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
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

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
      svg(),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev,
        preprocess
			}),
			resolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json', '.svg' ],
				dedupe
			}),
      aliases,
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};
