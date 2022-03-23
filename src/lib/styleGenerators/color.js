const { color } = require('../design-tokens.js');

function hsl (color) {
  if (color?.a < 1) {
  	return `hsl(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`
  }
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
}

function getValue (role, theme = 'default') {
	return color.themes[theme][role]
}

function getHSLValue (role, theme = 'default') {
	return hsl(color.themes[theme][role]);
}

function getCustomProperty (role) {
	return `var(--color-${role});`
}

function setCustomProperty (role, { h, s, l, a }) {
	return `
		--color-${role}-h: ${h};
		--color-${role}-s: ${s}%;
		--color-${role}-l: ${l}%;
		${a ? `--color-${role}-a: ${a};` : ''}

		--color-${role}: hsl(
			var(--color-${role}-h),
			var(--color-${role}-s),
			var(--color-${role}-l)
			${a ? `, ${a}` : ''}
		);
	`
}

function listCustomProperties (theme) {
	return Object.keys(color.themes[theme]).map((role) => {
		return setCustomProperty(role, color.themes[theme][role])
	})
}

function add (prop, role) {
	return `
		${prop}: ${hsl(color.themes.default[role])};
		${prop}: ${getCustomProperty(role)};
	`
}

module.exports = {
	name: 'Color',
	helpers: {
		getValue,
		getHSLValue,
		getCustomProperty,
		setCustomProperty,
		add
	},
	customProperties: listCustomProperties('default'),
	base: `
		/* to be implemented later
			@media screen and (prefers-color-scheme: dark) {
				body {
					${listCustomProperties('dark').join('\n')}
				}
			}
		*/

		body {
			${add('color', 'primary')}
			${add('background-color', 'bg')}
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
