const tags = require('../fields/tags.js')
const title = require('../fields/title.js')
const dimensions = require('../fields/dimensions.js')

module.exports = {
	label: 'Pictures',
	name: 'pictures',
	folder: 'content/pictures',
	create: true,
	slug: "{{year}}-{{slug}}",
	format: 'yml',
	editor: {
		preview: false
	},
	fields: [
		title(),
		{
			label: 'Date',
			name: 'date',
			widget: 'date',
			required: false
		},
		{
			label: 'Series',
			name: 'series',
			widget: 'select',
			options: [
				'Inventory',
				'Seasons'
			],
			required: false
		},
		...dimensions(),
		{
			label: 'Category',
			name: 'category',
			widget: 'select',
			options: [
				'prints',
				'paintings'
			],
			default: 'prints'
		},
		tags(),
		{
			label: 'Cover image',
			name: 'cover',
			widget: 'image'
		},
		{
			label: 'Thumbnail image',
			name: 'thumb',
			widget: 'image'
		},
		{
			label: 'Intro',
			name: 'intro',
			widget: 'markdown',
			modes: [ 'raw' ],
			required: false
		},
		{
			label: 'Editions',
			name: 'editions',
			widget: 'list',
			required: false,
			fields: [
				{
					label: 'Size',
					name: 'name',
					widget: 'string'
				},
				{
					label: 'Type',
					name: 'type',
					widget: 'select',
					options: [
						'giclee',
						'screenprint'
					],
					default: 'giclee'
				},
				...dimensions(['width', 'height', 'border']),
				{
					label: 'Price',
					name: 'price',
					widget: 'number',
					valueType: 'int'
				},
				{
					label: 'Limit', 
					name: 'limit', 
					hint: "Size of the edition; leave blank if open", 
					widget: 'number', 
					valueType: 'int', 
					required: false
				},
        {
        	label: 'Etsy listing', 
        	name: 'url', 
        	widget: 'string'
        },
        {
        	label: 'Photo',
          name: 'photo',
          widget: 'image'
        }
			]
		}
	]
}