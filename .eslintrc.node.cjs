// node/vanilla-specific config, inherits from base .eslintrc
module.exports = {
	extends: [
		'airbnb',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		// override a few airbnb rules that conflict with Vite/my opinions
		indent: [
			'error',
			'tab',
			{
				ignoredNodes: [
					'TemplateLiteral',
					'TemplateLiteral > *',
				]
			}
		],
		'no-tabs': 'off',
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
		'import/extensions': ['error', 'ignorePackages'],
		'import/no-extraneous-dependencies': 'off',
	},
};
