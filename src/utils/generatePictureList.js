const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const permalink = require('./permalink.js')
const render = require('./renderMarkdown.js')
const resizeImage = require('./resizeImage.js')
const siteData = require('./siteData.js')

const picturesConfig = siteData.collection('pictures')

module.exports = async (dir) => {
  // Use reduce to eliminate dotfiles from directory array
  // https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map#24806827
  const fileList = fs.readdirSync(dir).reduce((result, file) => {
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
        path: permalink.createPath(
          filename,
          picturesConfig.sourceTemplate,
          picturesConfig.pathTemplate
        )
      })
    }
    return result
  }, [])

  // create responsive resizes of the thumbnail images
  // -> cannot do this inside the reducer above because Promises get super complicated there
  await Promise.all(fileList.map(async (file) => {
  	file.thumbnail = await resizeImage(file.thumbnail, {
    	widths: [400, 800, 1000]
    })
  }))

  return fileList
}
