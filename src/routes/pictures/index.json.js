import fs from 'fs'
import yaml from 'js-yaml'
import resizeImage from '@/utils/resizeImage.js'
import generatePictureList from '@/utils/generatePictureList.js'
import render from '@/utils/renderMarkdown.js'

export async function get(req, res) {
  let content = yaml.safeLoad(
    fs.readFileSync('content/pictures.yml', 'utf-8')
  )
  const pictures = generatePictureList('content/pictures')

  if (content.intro) {
    content.intro = render(content.intro)
  }

  if (content.printDescriptions) {
    delete content.printDescriptions
  }

  // create responsive resizes of the thumbnail images
  await Promise.all(pictures.map(async (pictures) => {
  	pictures.thumbnail = await resizeImage(pictures.thumbnail, {
    	widths: [400, 800, 1000]
    })
  }))

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(JSON.stringify(
    { content, pictures }
  ))
}
