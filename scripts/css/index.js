// https://github.com/hankchizljaw/goron
const fs = require('fs')
const path = require('path')
const borders = require('./borders.js')
const breakpoints = require('./breakpoints.js')
const color = require('./color.js')
const spacing = require('./spacing.js')
const type = require('./type.js')
const visibility = require('./visibility.js')

function render (type, modules) {
	return modules.map(styles => `
		/* --- ${styles.name} --- */
		${styles[type]}
	`).join('\n')
}

const customProperties = `
	/* --- Global custom properties --- */
	:root {
		${[color, breakpoints, spacing].map(styles => `
			/* --- ${styles.name} --- */
			${styles.customProperties.join('')}
		`).join('\n')}
	}
`
const base = `
	/* --- Base styles --- */
	${render('base', [color, type])}
`
const utilities = `
	/* --- Utility classes --- */
	${render('utilities', [color, spacing, type, borders, visibility])}
`

fs.writeFileSync(
	path.join(__dirname, '../../static/stylesheets/main.css'),
	[customProperties, base, utilities].join('\n')
)
