const fs = require('fs')
const path = require('path')
const color = require('./color.js')
const spacing = require('./spacing.js')

fs.writeFileSync(
	path.join(__dirname, '../../static/stylesheets/utilities.css'),
	[color, spacing].join('\n')
)