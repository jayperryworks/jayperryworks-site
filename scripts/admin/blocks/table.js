const blockType = require('../fields/blockType.js')
const useInExcerpt = require('../fields/useInExcerpt.js')
const prominence = require('../fields/prominence.js')

module.exports = {
	label: 'Table',
	name: 'table',
	widget: 'object',
	fields: [
		blockType('table'),
		useInExcerpt(),
		prominence({
			options: [ 'small', 'medium', 'large' ],
			defaultValue: 'medium'
		}),
		{
			label: 'Heading Columns',
			name: 'headingColumns',
			widget: 'list',
			required: false,
			hint: 'Columns that appear bold and function as headings for their rows'
		},
		{
			label: 'Header cells',
			name: 'header',
			widget: 'list',
			hint: 'The top row, which defines the values in the rest of the table',
			fields: [
				{
					label: 'Label',
					name: 'label',
					widget: 'string'
				},
				{
					label: 'Text alignment',
					name: 'align',
					widget: 'select',
					options: [ 'left', 'center', 'right' ],
					default: 'left'
				}
			]
		},
		{
			label: 'Body rows',
			name: 'body',
			widget: 'list',
			required: false,
			fields: {
				label: 'Cells',
				name: 'cell',
				widget: 'list'
			}
		},
		{
			label: 'Footer rows',
			name: 'footer',
			widget: 'list',
			required: false,
			fields: [
				{
					label: 'Cells',
					name: 'cell',
					widget: 'list'
				}
			]
		}
	]
}