const alt = require('../fields/alt.js')
const prominence = require('../fields/prominence.js')
const resize = require('../fields/resize.js')
const useInExcerpt = require('../fields/useInExcerpt.js')

module.exports = {
  label: 'Figure',
  name: 'figure',
  widget: 'object',
  fields: [
    {
      label: 'Type',
      name: 'type',
      widget: 'hidden',
      default: 'figure'
    },
    useInExcerpt,
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
    alt,
    {
      label: 'Caption',
      name: 'caption',
      widget: 'markdown',
      minimal: true,
      required: false
    },
    {
      label: 'Attribution',
      name: 'attribution',
      widget: 'string',
      required: false,
      hint: 'Add a photo or artist credit, if needed.'
    }
  ]
}