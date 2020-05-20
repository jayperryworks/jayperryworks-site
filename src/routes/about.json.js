import fs from 'fs'
import yaml from 'js-yaml'
import renderPostBody from '@/utils/renderPostBody.js'
import { findInManifest } from '@/utils/imageHelpers.js'

export function get(req, res) {
  let data = yaml.safeLoad(
    fs.readFileSync('content/about.yml', 'utf-8')
  )

  // resize the cover image
  if (data.cover && data.cover.image) {
  	data.cover.image = findInManifest(data.cover.image)
  }

  data.body = renderPostBody(data.body)

  // resize body images
  data.body.forEach((block) => {
  	// if it has an 'image' field (e.g. figure), resize it
  	if (block.image) {
  		block.image = findInManifest(block.image)
  	}

  	if (block.images) {
  		// if it has an 'images' field (e.g. gallery), resize each
  		block.images.forEach((item) => {
				item.image = findInManifest(item.image)
  		})
  	}
  })

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
