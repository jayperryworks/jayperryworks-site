const blockType = require('../fields/blockType.js')

module.exports = {
	label: 'Section',
	name: 'sectionStart',
	hint: 'Used to mark off the start of a new section of content.',
	widget: 'object',
	fields: [
		{
			label: 'Unique ID',
			name: 'uid',
			widget: 'string'
		},
		{
			label: 'Short title',
			name: 'shortTitle',
			widget: 'string'
		},
		blockType('sectionStart')
	]
}