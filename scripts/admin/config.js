const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function loadYaml(file) {
	return yaml.safeLoad(
		fs.readFileSync(path.join(__dirname, file))
	)
}

// pull CMS config from content folder
// const gitConfig = loadYaml('../content/cms-config.yml')

// yaml config files for site settings
const settings = [
	'./settings/site.yml',
	'./settings/toc.yml'
].map(file => loadYaml(file))

const fields = {
	alt: require('./fields/alt.js'),
	dimensions: require('./fields/dimensions.js'),
	tags: require('./fields/tags.js'),
	title: require('./fields/title.js'),
	type: require('./fields/type.js')
}

// yaml config files for each content block
const blocks = {
	heading: require('./blocks/heading.js'),
	// passage: require('./blocks/passage.js'),
	figure: require('./blocks/figure.js'),
	gallery: require('./blocks/gallery.js'),
	// note: require('./blocks/note.js'),
	// table: require('./blocks/table.js')
}

// config for 'body' with content blocks
const body = {
	label: 'Body blocks',
	name: 'body',
	widget: 'list',
	required: false,
	types: Object.values(blocks)
}

const blog = {
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
		fields.title,
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
				{
					label: 'Image',
					name: 'image',
					widget: 'image',
					required: false
				},
				{
					label: 'Border',
					name: 'border',
					widget: 'boolean',
					default: false
				},
				fields.alt,
				{
					label: 'Resize',
					name: 'resize',
					widget: 'boolean',
					default: false
				},
				{
					label: 'Caption',
					name: 'caption',
					widget: 'string',
					required: false
				},
				{
					label: 'Credit',
					name: 'credit',
					widget: 'string',
					required: false
				}
			]
		},
		{
			label: 'Tags',
			name: 'tags',
			widget: 'list',
			required: false
		},
		body
	]
}

const pictures = {
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
		fields.title,
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
		...fields.dimensions(),
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
		fields.tags,
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
				...fields.dimensions(['width', 'height', 'border']),
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

// create the Yaml admin config from this JS object
// -> allows us to break it up into reusable modules
fs.writeFileSync(
  path.join(__dirname, '../../static/admin/config.yml'),
  yaml.dump({
		backend: {
		  name: 'github',
		  // repo: gitConfig.repo,
		  // branch: gitConfig.branch
		},
		media_folder: 'source/assets/uploads',
		public_folder: '/uploads',
		// site_url: gitConfig.publicUrl,
		publish_mode: 'editorial_workflow',
		collections: [
			blog,
			pictures
		]
	})
)
