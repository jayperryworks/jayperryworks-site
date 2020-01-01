// build an object of strings and keys from the output template
// -> e.g. :year/:slug
function _templateData (string) {
  const stringArray = string.split('/')

  return {
    strings: stringArray.map((value) => {
      return value.includes(':') ? false : value
    }),
    keys: stringArray.reduce((result, string) => {
      if (string.includes(':')) {
        result.push(string.replace(':', ''))
        return result
      }
      result.push(false)
      return result
    }, [])
  }
}

// build an array of keys from a source template (e.g. :year-:slug)
function _sourceTemplateKeys (filename) {
  return filename.split('-').reduce((result, string) => {
    if (string.includes(':')) {
      result.push(string.replace(':', ''))
    }
    return result
  }, [])
}

// output object with template keys and filename values
// e.g. { year: 2019, slug: 'seasons' }
function fileMetadata (filename, sourceTemplate) {
  const templateKeys = _sourceTemplateKeys(sourceTemplate)
  return templateKeys.reduce((result, key, index) => {
    const metadata = filename.split('-')

    if (index === templateKeys.length - 1) {
      result[key] = metadata.slice(index, metadata.length).join('-')
      return result
    }
    result[key] = metadata[index]
    return result
  }, {})
}

// output path with values from filename
// filename: a file to parse, e.g. 2019-seasons.yml
// sourceTemplate: a template for file naming, e.g. :year-:slug
// destTemplate: a template for the output path, e.g. :year/:slug
// outputs e.g. 2019/seasons
function createPath (filename, sourceTemplate, destTemplate) {
  const filenameData = fileMetadata(filename, sourceTemplate)
  const template = _templateData(destTemplate)

  return template.keys.map((value, index) => {
    if (!value) {
      return template.strings[index]
    }
    return filenameData[value]
  }).join('/')
}

module.exports = { fileMetadata, createPath }

// console.log(fileMetadata('2019-seasons-test-more-stuff', ':year-:slug'))
// console.log(_templateData('pictures/:year/:slug').strings)
// console.log(
//   createPath(
//     '2019-seasons-test-more-stuff',
//     ':year-:slug',
//     'pictures/:year/:slug'
//   )
// )
