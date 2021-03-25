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

const outputPath = '../../static/stylesheets'

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

if (!fs.existsSync(path.join(__dirname, outputPath))) {
	fs.mkdirSync(path.join(__dirname, outputPath))
}

fs.writeFileSync(
	path.join(__dirname, `${outputPath}/main.css`),
	[customProperties, base, utilities].join('\n')
)
