// Generate global CSS from design tokens
// -> based heavily on Andy Picaccalilli's ideas in Gorko and Goron
// Gorko: https://github.com/andy-piccalilli/gorko
// Goron: https://github.com/hankchizljaw/goron
import fs from 'fs';
import path from 'path';

const modules = {
	borders: require('../src/lib/styleGenerators/borders.js'),
	breakpoints: require('../src/lib/../src/lib/styleGenerators/breakpoints.js'),
	color: require('../src/lib/../src/lib/styleGenerators/color.js'),
	contentWidth: require('../src/lib/../src/lib/styleGenerators/contentWidth.js'),
	reset: require('../src/lib/styleGenerators/reset.js'),
	scale: require('../src/lib/styleGenerators/contentWidth.js'),
	spacing: require('../src/lib/styleGenerators/spacing.js'),
	specialEffects: require('../src/lib/styleGenerators/specialEffects.js'),
	type: require('../src/lib/styleGenerators/type.js'),
	visibility: require('../src/lib/styleGenerators/visibility.js')
}

const outputPath = '../../static/stylesheets';

if (!fs.existsSync(path.join(__dirname, outputPath))) {
	fs.mkdirSync(path.join(__dirname, outputPath))
}

fs.writeFileSync(
	path.join(__dirname, `${outputPath}/base.css`),
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

// fs.writeFileSync(
// 	path.join(__dirname, `${outputPath}/utilities/${module}.css`),
// 	render('utilities')
)
