// parse source template
// set up placeholders for :year, :month, :day, :slug
// split the string by '-'
// get index of each placeholder in array

// read file name of each post in dir
// split the string by '-'
// loop through the template array and inject values from filename array
templateArray.map((key, index) => {
  return {
    [key]: filenameArray[index]
  }
})
return '${year}/${slug}'