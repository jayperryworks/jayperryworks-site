import fs from 'fs'
import yaml from 'js-yaml'
import { findInManifest } from '@/utils/imageHelpers.js'
import generatePictureList from '@/utils/generatePictureList.js'
import render from '@/utils/renderMarkdown.js'

export async function get(req, res) {
  let content = yaml.safeLoad(
    fs.readFileSync('content/design.yml', 'utf-8')
  )
  // const pictures = generatePictureList('content/pictures')

  if (content.intro) {
    content.intro = render(content.intro)
  }

  if (content.clients.intro) {
    content.clients.intro = render(content.clients.intro)
  }

  if (content.toc.intro) {
    content.toc.intro = render(content.toc.intro)
  }

  // create responsive resizes of the thumbnail images
  content.toc.items.forEach((item) => {
    item.images.forEach((image) => {
      image.source = findInManifest(image.source)
    })
  })

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(JSON.stringify(content))
}
