const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const renderPostBody = require('./renderPostBody.js')

module.exports = (dir) => {
  return fs.readdirSync(dir).reduce((result, file) => {
    const filename = path.parse(file).name

    // make sure we aren't accidentally reading a system dotfile
    if (filename[0] !== '.') {
      const metadata = filename.split('-')
      const date = {
        year: metadata[0],
        month: metadata[1],
        day: metadata[2]
      }
      const slug = metadata.slice(3, metadata.length).join('-')

      let data = yaml.safeLoad(
        fs.readFileSync(`${dir}/${filename}.yml`, 'utf-8')
      )

      // pull any sections marked to be used in the excerpt
      let excerpt = data.body.filter((section) => {
        return section.useInExcerpt
      })

      const hasExcerpt = excerpt.length > 0

      // add to beginning of the array, so the order is reversed
      // -> most recent to oldest
      result.unshift({
        cover: data.cover,
        title: data.title,
        subtitle: data.subtitle,
        date,
        slug,
        path: `writing/${date.year}/${date.month}/${date.day}/${slug}`,
        readMore: hasExcerpt,
        excerpt: hasExcerpt
          ? renderPostBody(excerpt)
          : renderPostBody(data.body)
      })
    }
    return result
  }, []) // display in order of most recent
}
