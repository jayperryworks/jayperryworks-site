// https://github.com/hankchizljaw/goron
const fs = require('fs')
const path = require('path')
const color = require('./color.js')
const spacing = require('./spacing.js')
const breakpoints = require('./breakpoints.js')
const visibility = require('./visibility.js')

function render (type, modules) {
	return modules.map(styles => `
		/* --- ${styles.name} --- */
		${styles[type]}
	`).join('\n')
}

const customProps = `
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
	${render('base', [color])}
`
const utilities = `
	/* --- Utility classes --- */
	${render('utilities', [color, spacing, visibility])}
`

fs.writeFileSync(
	path.join(__dirname, '../../static/stylesheets/utilities.css'),
	[customProps, base, utilities].join('\n')
)