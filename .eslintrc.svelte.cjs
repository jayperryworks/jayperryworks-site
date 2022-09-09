// svelte-specific config, inherits from base .eslintrc
module.exports = {
	plugins: [
		'svelte3',
		'@typescript-eslint',
	],
	overrides: [ // this stays the same
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	ignorePatterns: [
		'**/*.css',
	],
	settings: {
		'svelte3/typescript': true,
	},
};
