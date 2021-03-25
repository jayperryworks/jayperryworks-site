const { color } = require('../../content/design-tokens.js')

function hsl (color) {
  if (color.a && color.a !== 1) {
  	return `hsla(${color.h}, ${color.s}, ${color.l}, ${color.a})`
  }
  return `hsl(${color.h}, ${color.s}, ${color.l})`
}

function getValue (role, theme = 'default') {
	return hsl(color.themes[theme][role])
}

function getCustomProperty (role, theme = 'default') {
	return `--color-${role}: ${hsl(color.themes[theme][role])};`
}

function add (prop, role) {
	return `
		${prop}: ${hsl(color.themes.default[role])};
		${prop}: var(--color-${role});
	`
}

function listCustomProperties (theme) {
	return Object.keys(color.themes[theme]).map(role => getCustomProperty(role, theme))
}

module.exports = {
	name: 'Color',
	helpers: {
		getValue,
		getCustomProperty,
		add
	},
	customProperties: listCustomProperties('default'),
	base: `
		@media screen and (prefers-color-scheme: dark) {
			body {
				${listCustomProperties('dark').join('\n')}
			}
		}
	`,
	utilities: Object.keys(color.themes.default)
		.filter(roleName => roleName !== 'shadow')
		.map(roleName => `
			.color-fg-${roleName} {
				${add('color', roleName)}
			}

			.color-bg-${roleName} {
				${add('background-color', roleName)}
			}
		`)
		.join('\n')
}
