const alt = require('../fields/alt.js')
const body = require('../fields/body.js')
const caption = require('../fields/caption.js')
const image = require('../fields/image.js')
const resize = require('../fields/resize.js')
const tags = require('../fields/tags.js')
const title = require('../fields/title.js')

module.exports = {
	label: 'Blog',
	name: 'blog',
	folder: 'content/blog',
	create: true,
	slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
	format: 'yml',
	editor: {
		preview: false
	},
	fields: [
		title(),
		{
			label: 'Subtitle',
			name: 'subtitle',
			widget: 'string',
			required: false
		},
		{
			label: 'Cover image',
			name: 'cover',
			widget: 'object',
			required: false,
			fields: [
				image({ required: false }),
				{
					label: 'Border',
					name: 'border',
					widget: 'boolean',
					default: false
				},
				alt(),
				resize(),
				caption(),
				{
					label: 'Credit',
					name: 'credit',
					widget: 'string',
					required: false
				}
			]
		},
		tags(),
		body()
	]
}