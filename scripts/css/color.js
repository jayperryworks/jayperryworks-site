const { color } = require('../../content/design-tokens.js')

function hsl (color) {
  return !color.a
    ? `hsl(${color.h}, ${color.s}, ${color.l})`
    : `hsla(${color.h}, ${color.s}, ${color.l}, ${color.a})`
}

function declaration (prop, role) {
	return `
		${prop}: ${hsl(color.themes.default[role])};
		${prop}: var(--color-${role});
	`
}

function customProps (theme) {
	return Object.keys(color.themes[theme])
		.map(role => `
			--color-${role}: ${hsl(color.themes[theme][role])};
		`)
		.join('')
}

function theme (name) {
	return `
		.color-theme-${name} {
			${customProps(name)}
		}
	`
}

module.exports = `
	/* --- color ---*/
	:root {
		${customProps('default')}
	}

	/* themes */
	${Object.keys(color.themes).map(themeName => theme(themeName)).join('\n')}

	/* utilities */
	${Object.keys(color.themes.default)
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
	}
`