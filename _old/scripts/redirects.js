const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const generateBlogList = require('../src/utils/generateBlogList.js')
const siteData = require('../src/utils/siteData.js')
const permalink = require('../src/utils/permalink.js')

const status = 302

// create a simple rule for picture redirects
// -> since the old and new paths are very similar, we can use :splat
const picturesRedirect = {
  old: '/work/prints/*',
  new: '/pictures/:splat'
}

function render(list) {
  return list.reduce((result, post) => {
    const collection = siteData.collection(post.collection)

    if (collection.redirect) {
    	collection.redirect.forEach((entry) => {
    		const oldPath = permalink.createPath(
    		  post.filename,
    		  collection.sourceTemplate,
    		  entry.oldPath
    		)

    		if (!entry.after) {
    			entry.after = 0
    		}

    		if (post.date.year >= entry.after && post.date.year <= entry.before) {
    		  result.push(`/${(oldPath)}\t/${post.path}\t${status}`)
    		}
    	})
    }
    return result
  }, [
	  // add the simple rule for pictures redirects
  	`${picturesRedirect.old}\t${picturesRedirect.new}\t${status}`
	]).join('\n')
}

fs.writeFileSync(
  path.join(__dirname, '../static/_redirects'),
  render([
    ...generateBlogList(
      path.join(__dirname, '../content/blog')
    )
  ])
)
