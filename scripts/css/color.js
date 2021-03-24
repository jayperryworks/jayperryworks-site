const { color } = require('../../content/design-tokens.js')

function hsl (color) {
  if (color.a && color.a !== 1) {
  	return `hsla(${color.h}, ${color.s}, ${color.l}, ${color.a})`
  }
  return `hsl(${color.h}, ${color.s}, ${color.l})`
}

function declaration (prop, role) {
	return `
		${prop}: ${hsl(color.themes.default[role])};
		${prop}: var(--color-${role});
	`
}

function customProperties (theme) {
	return Object.keys(color.themes[theme]).map(role => `
		--color-${role}: ${hsl(color.themes[theme][role])};
	`)
}

const utilities = Object.keys(color.themes.default)
		.filter(roleName => roleName !== 'shadow')
	.map(roleName => `
		.color-fg-${roleName} {
			${declaration('color', roleName)}
		}

		.color-bg-${roleName} {
			${declaration('background-color', roleName)}
		}
	`)
	.join('\n')

module.exports = {
	name: 'Color',
	customProperties: customProperties('default'),
	base: `
		@media screen and (prefers-color-scheme: dark) {
			body {
				${customProperties('dark').join('\n')}
			}
		}
	`,
	utilities
}
