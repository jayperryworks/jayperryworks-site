// parse source template
// set up placeholders for :year, :month, :day, :slug
// split the string by '-'
// get index of each placeholder in array
// read file name of each post in dir
// split the string by '-'
// loop through the template array and inject values from filename array

// do this with tagged template literals?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// https://codeburst.io/javascript-template-literals-tag-functions-for-beginners-758a041160e1

const template = ':year-:slug'
const filename = '2019-seasons-fall'

const filenameArray = filename.split('-')

function template(strings, ...keys) {
  return keys
}

templateArray = template`${year}-${slug}`

templateArray = template.split('-').map((value) => {
  return value.replace(':', '')
})

const data = templateArray.reduce((result, key, index) => {
  if (index < templateArray.length) {
    result[key] = filenameArray[index]
  }
  if (index = templateArray.length) {
    result[key] = filenameArray.slice(index, filenameArray.length)
  }
  return result
}, {})
return `${data.year}/${data.slug}`