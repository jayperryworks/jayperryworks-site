import prismic, { blockQueries } from '@/utils/prismicQuery.js'
import { findInManifest } from '@/utils/imageHelpers.js'
import markdown from '@/utils/renderMarkdown.js'

export async function get(req, res) {
  let response = await prismic(`
    query{
      page(uid: "about", lang: "en-us") {
        title
        subtitle
        body {
          __typename
          ${Object.values(blockQueries).map(type => type())}
        }
      }
    }
  `)

  let { title, subtitle, body } = await response.data.page

  body = body.map((slice) => {
    if (slice.primary.markdown) {
      slice.primary.html = markdown(slice.primary.markdown[0].text)
    }

    if (slice.primary.caption) {
      slice.primary.caption = markdown(slice.primary.caption[0].text)
    }

    return slice
  })

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify({
    title: title?.[0]?.text,
    subtitle: subtitle?.[0]?.text,
    body
  }))
}
