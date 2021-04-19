const useInExcerpt = require('../fields/useInExcerpt.js')
const content = require('../fields/content.js')
const blockType = require('../fields/blockType.js')

module.exports = {
	label: 'Note',
	name: 'note',
	widget: 'object',
	hint: 'An aside that speaks about the text, e.g. an intro note or acknowledgements at the end',
	fields: [
		blockType('note'),
		useInExcerpt(),
		content()
	]
}