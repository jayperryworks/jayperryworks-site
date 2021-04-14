const blockType = require('../fields/blockType.js')
const content = require('../fields/content.js')

module.exports = {
	label: 'Heading',
	name: 'heading',
	widget: 'object',
	fields: [
		blockType('heading'),
		{
			label: 'Level',
			name: 'level',
			widget: 'number',
			value_type: 'int',
			min: 1,
			max: 6,
			required: false,
			default: 2
		},
		content('inlineMarkdown')
	]
}