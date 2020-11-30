const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const permalink = require('./permalink.js')
const renderMarkdown = require('./renderMarkdown.js')
const renderPostBody = require('./renderPostBody.js')
const siteData = require('./siteData.js')

const blogConfig = siteData.collection('blog')

module.exports = (
  dir,
  {
    start = 0,
    end = false
  } = {}
) => {
  let files = fs.readdirSync(dir).reverse()

  // store a reference to the total number of posts before we split
  // -> so we know where to end pagination
  const totalPosts = files.length

  // cut the array down to size for pagination
  if (end) {
    files = files.slice(start, end)
  }

  return files.reduce((result, file) => {
    const filename = path.parse(file).name

    // skip system dotfiles
    if (filename[0] === '.') return result

    const metadata = permalink.fileMetadata(filename, blogConfig.sourceTemplate)

    const data = yaml.safeLoad(
      fs.readFileSync(`${dir}/${filename}.yml`, 'utf-8')
    )

    if (data.cover) {
      // render the cover image caption if present
      if (data.cover.caption) {
        data.cover.caption = renderMarkdown(data.cover.caption, {
          inline: true,
          html: true
        })
      }

      // render the cover image attribution if present
      if (data.cover.credit) {
        data.cover.credit = renderMarkdown(data.cover.credit, {
          inline: true,
          html: true
        })
      }
    }

    // pull any sections marked to be used in the excerpt
    const excerpt = data.body.filter((section) => {
      return section.useInExcerpt
    })

    const hasExcerpt = excerpt.length > 0

    // add to beginning of the array, so the order is reversed
    // -> most recent to oldest
    result.push({
      filename,
      cover: data.cover,
      title: data.title,
      subtitle: data.subtitle,
      date: {
        year: Number(metadata.year),
        // subtract 1 from month b/c the 'monthIndex' value in JS Date objects is zero-based
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
        month: Number(metadata.month - 1),
        day: Number(metadata.day)
      },
      slug: metadata.slug,
      collection: blogConfig.name,
      path: permalink.createPath(filename, blogConfig.sourceTemplate, blogConfig.pathTemplate),
      readMore: hasExcerpt,
      excerpt: hasExcerpt
        ? renderPostBody(excerpt)
        : renderPostBody(data.body)
    })

    return result
  }, [])
}
