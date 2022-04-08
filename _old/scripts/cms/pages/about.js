const body = require('../fields/body.js')

module.exports = {
	name: 'about',
  label: 'About',
  file: 'content/about.yml',
  format: 'yml',
  create: false,
  fields: [
    {
    	label: 'Title',
      name: 'title',
      widget: 'string'
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
          widget: 'image'
        },
        {
        	label: 'Alt',
          name: 'alt',
          widget: 'string',
          required: false
        },
        {
        	label: 'Caption',
          name: 'caption',
          widget: 'string',
          required: false
        }
      ]
    },
    body()
  ]
}