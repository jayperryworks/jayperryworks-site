import fs from 'fs'
import yaml from 'js-yaml'
import renderPostBody from '@/utils/renderPostBody.js'
import resizeImage from '@/utils/resizeImage.js'

export async function get(req, res) {
  let data = yaml.safeLoad(
    fs.readFileSync('content/about.yml', 'utf-8')
  )

  // resize the cover image
  if (data.cover && data.cover.image) {
  	data.cover.image = await resizeImage(data.cover.image)
  }

  data.body = renderPostBody(data.body)

  // resize body images
  await Promise.all(data.body.map(async (block) => {
  	// if it has an 'image' field (e.g. figure), resize it
  	if (block.image) {
  		block.image = await resizeImage(block.image)
  	}

  	if (block.images) {
  		// if it has an 'images' field (e.g. gallery), resize each
  		block.images.map(async (item) => {
				item.image = await resizeImage(item.image)
  		})
  	}
  }))

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(data))
}
