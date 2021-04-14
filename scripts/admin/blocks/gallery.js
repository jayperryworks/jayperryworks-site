const alt = require('../fields/alt.js')
const caption = require('../fields/caption.js')
const image = require('../fields/image.js')
const prominence = require('../fields/prominence.js')
const resize = require('../fields/resize.js')
const useInExcerpt = require('../fields/useInExcerpt.js')

module.exports = {
  label: 'Gallery',
  name: 'gallery',
  widget: 'object',
  fields: [
    {
      label: 'Type',
      name: 'type',
      widget: 'hidden',
      default: 'gallery'
    },
    useInExcerpt(),
    prominence(),
    {
      label: 'Size',
      name: 'size',
      widget: 'select',
      options: [
        'small',
        'medium',
        'large'
      ]
    },
    resize(),
    {
      label: 'Images',
      name: 'images',
      widget: 'list',
      fields: [
        image(),
        alt()
      ]
    },
    caption({ name: 'inlineMarkdown' })
  ]
}