const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function get (key = false) {
  const data = yaml.safeLoad(
    fs.readFileSync('content/site.yml')
  )
  if (key) {
    return data[key]
  }
  return data
}

function collection (name) {
  return get('collections').find(collection => collection.name === name)
}

module.exports = { get, collection }
