module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'svelte3',
		'@typescript-eslint'
	],
	'overrides': [ // this stays the same
		{
			'files': ['*.svelte'],
			'processor': 'svelte3/svelte3'
		}
	],
	'ignorePatterns': [
		'**/*.css'
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				'ignoredNodes': ['TemplateLiteral', 'TemplateLiteral > *'] }
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	},
	'settings': {
		'svelte3/typescript': true
	}
};
