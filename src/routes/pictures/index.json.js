import fs from 'fs'
import yaml from 'js-yaml'
import generatePictureList from '@/utils/generatePictureList.js'
import resizeImage from '@/utils/resizeImage.js'
import render from '@/utils/renderMarkdown.js'

export function get(req, res) {
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

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(JSON.stringify(
    { content, pictures }
  ))
}
