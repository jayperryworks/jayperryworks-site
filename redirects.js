const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const generatePictureList = require('./src/utils/generatePictureList.js')
const generateWritingList = require('./src/utils/generateWritingList.js')
const siteData = require('./src/utils/siteData.js')
const permalink = require('./src/utils/permalink.js')

const picturesRedirect = {
  old: '/work/prints/*',
  new: '/pictures/:splat\t302'
}

function render(list) {
  return list.reduce((result, post) => {
    const collection = siteData.collection(post.collection)

    if (collection.redirect) {
      const oldPath = permalink.createPath(
        post.filename,
        collection.sourceTemplate,
        collection.redirect.oldPath
      )

      if (post.date.year <= collection.redirect.before) {
        result.push(`${(oldPath)}\t${post.path}\t302`)
      }
    }
    return result
  }, [`${picturesRedirect.old}\t${picturesRedirect.new}`]).join('\n')
}

fs.writeFileSync(
  './static/_redirects',
  render([
    ...generateWritingList(
      path.join(__dirname, './content/writing')
    )
  ])
)
