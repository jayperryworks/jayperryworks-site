// https://github.com/hankchizljaw/goron
const fs = require('fs')
const path = require('path')

const modules = {
	borders: require('./borders.js'),
	breakpoints: require('./breakpoints.js'),
	color: require('./color.js'),
	spacing: require('./spacing.js'),
	scale: require('./scale.js'),
	type: require('./type.js'),
	visibility: require('./visibility.js'),
	specialEffects: require('./specialEffects.js'),
	contentWidth: require('./contentWidth.js')
}

function render (type) {
	return Object.values(modules).map((styles) => {
		if (styles[type]) {
			return `
				/* --- ${styles.name} --- */
				${Array.isArray(styles[type]) ? styles[type].join('') : styles[type]}
			`
		}
	}).join('\n')
}

const outputPath = '../../static/stylesheets'

if (!fs.existsSync(path.join(__dirname, outputPath))) {
	fs.mkdirSync(path.join(__dirname, outputPath))
}

fs.writeFileSync(
	path.join(__dirname, `${outputPath}/global.css`),
	`
		/* --- Global custom properties --- */
		:root {
			${render('customProperties')}
		}

		/* --- Base styles --- */
		${render('base')}

		/* --- Utility classes --- */
		${render('utilities')}
	`
)
