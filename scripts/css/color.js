const { color } = require('../../content/design-tokens.js')

function hsl (color) {
  if (color.a && color.a !== 1) {
  	return `hsl(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`
  }
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
}

function getValue (role, theme = 'default') {
	return hsl(color.themes[theme][role])
}

function getCustomProperty (role, theme = 'default') {
	const colorData = color.themes[theme][role]
	return `
		--color-${role}: ${hsl(colorData)};
		--color-${role}-h: ${colorData.h};
		--color-${role}-s: ${colorData.s}%;
		--color-${role}-l: ${colorData.l}%;
	`
}

function listCustomProperties (theme) {
	return Object.keys(color.themes[theme]).map(role => getCustomProperty(role, theme))
}

function add (prop, role) {
	return `
		${prop}: ${hsl(color.themes.default[role])};
		${prop}: var(--color-${role});
	`
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
