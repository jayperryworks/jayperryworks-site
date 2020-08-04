const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const permalink = require('./permalink.js')
const render = require('./renderMarkdown.js')
const siteData = require('./siteData.js')

const picturesConfig = siteData.collection('pictures')

module.exports = (dir) => {
  // Use reduce to eliminate dotfiles from directory array
  // https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map#24806827
  return fs.readdirSync(dir).reduce((result, file) => {
    const filename = path.parse(file).name

    // make sure we aren't accidentally reading a system dotfile
    if (filename[0] !== '.') {
      const metadata = permalink.fileMetadata(filename, picturesConfig.sourceTemplate)

      const data = yaml.safeLoad(
        fs.readFileSync(`${dir}/${filename}.yml`, 'utf-8')
      )

      // place at front of array to order by most recent
      result.unshift({
        filename,
        title: data.title,
        collection: picturesConfig.name,
        date: {
          year: metadata.year
        },
        slug: metadata.slug,
        thumbnail: data.thumb,
        series: data.series,
        path: permalink.createPath(
          filename,
          picturesConfig.sourceTemplate,
          picturesConfig.pathTemplate
        )
      })
    }
    return result
  }, [])
}
