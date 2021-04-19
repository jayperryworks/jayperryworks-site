const alt = require('../fields/alt.js')
const blockType = require('../fields/blockType.js')
const prominence = require('../fields/prominence.js')
const resize = require('../fields/resize.js')
const useInExcerpt = require('../fields/useInExcerpt.js')
const image = require('../fields/image.js')
const caption = require('../fields/caption.js')

module.exports = {
  label: 'Figure',
  name: 'figure',
  widget: 'object',
  fields: [
    blockType('figure'),
    useInExcerpt(),
    prominence(),
    {
      label: 'Image',
      name: 'image',
      widget: 'image'
    },
    resize(),
    {
      label: 'Border',
      name: 'border',
      widget: 'boolean',
      default: false
    },
    alt(),
    caption(),
    {
      label: 'Attribution',
      name: 'attribution',
      widget: 'string',
      required: false,
      hint: 'Add a photo or artist credit, if needed.'
    }
  ]
}