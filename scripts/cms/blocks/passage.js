const blockType = require('../fields/blockType.js')
const useInExcerpt = require('../fields/useInExcerpt.js')
const content = require('../fields/content.js')

module.exports = {
	label: 'Passage',
	name: 'passage',
	widget: 'object',
	fields: [
		blockType('passage'),
		useInExcerpt(),
		content()
	]
}