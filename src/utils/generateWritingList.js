const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const renderPostBody = require('./renderPostBody.js')
const permalink = require('./permalink.js')
const siteData = require('./siteData.js')

const writingConfig = siteData.collection('writing')

module.exports = (dir) => {
  return fs.readdirSync(dir).reduce((result, file) => {
    const filename = path.parse(file).name

    // make sure we aren't accidentally reading a system dotfile
    if (filename[0] !== '.') {
      const metadata = permalink.fileMetadata(filename, writingConfig.sourceTemplate)

      const data = yaml.safeLoad(
        fs.readFileSync(`${dir}/${filename}.yml`, 'utf-8')
      )

      // pull any sections marked to be used in the excerpt
      const excerpt = data.body.filter((section) => {
        return section.useInExcerpt
      })

      const hasExcerpt = excerpt.length > 0

      // add to beginning of the array, so the order is reversed
      // -> most recent to oldest
      result.unshift({
        filename,
        cover: data.cover,
        title: data.title,
        subtitle: data.subtitle,
        date: {
          year: metadata.year,
          month: metadata.month,
          day: metadata.day
        },
        slug: metadata.slug,
        collection: writingConfig.name,
        path: permalink.createPath(filename, writingConfig.sourceTemplate, writingConfig.pathTemplate),
        readMore: hasExcerpt,
        excerpt: hasExcerpt
          ? renderPostBody(excerpt)
          : renderPostBody(data.body)
      })
    }
    return result
  }, [])
}
