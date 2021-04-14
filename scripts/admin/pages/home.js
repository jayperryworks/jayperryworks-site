const callToAction = require('../fields/callToAction.js')
const content = require('../fields/content.js')

module.exports = {
	name: 'home',
	label: 'Home page',
	file: 'content/home.yml',
	format: 'yml',
	create: false,
	fields: [
		{
			label: 'Intro',
			name: 'intro',
			widget: 'object',
			fields: [
				{
					label: 'Headline',
					name: 'headline',
					widget: 'string'
				},
				content({
					name: 'Blurb',
					label: 'blurb'
				}),
				callToAction()
			]
		},
		{
			label: 'Table of contents',
			name: 'tableOfContents',
			widget: 'object',
			fields: [
				{
					label: 'Pictures',
					name: 'pictures',
					widget: 'object',
					fields: [
						{
							label: 'Heading',
							name: 'heading',
							widget: 'string'
						},
						{
							label: 'Slug',
							name: 'slug',
							widget: 'string'
						},
						content({
							name: 'Blurb',
							label: 'blurb'
						}),
						{
							label: 'Cover image',
							name: 'coverImage',
							widget: 'image'
						},
						callToAction()
					]
				},
				{
					label: 'Blog',
					name: 'blog',
					widget: 'object',
					fields: [
						{
							label: 'Heading',
							name: 'heading',
							widget: 'string'
						},
						{
							label: 'Slug',
							name: 'slug',
							widget: 'string'
						},
						{
							label: 'List',
							name: 'list',
							widget: 'object',
							fields: [
								{
									label: 'Source',
									name: 'source',
									widget: 'string'
								},
								{
									label: 'Length',
									name: 'length',
									widget: 'number',
									default: 8,
									'value_type': 'int',
									min: 0
								},
							]
						},
						callToAction()
					]
				}
			]
		}
	]
}