import fs from 'fs'
import yaml from 'js-yaml'
import generatePictureList from '@/utils/generatePictureList.js'
import render from '@/utils/renderMarkdown.js'

export async function get(req, res) {
  let content = yaml.safeLoad(
    fs.readFileSync('content/pictures.yml', 'utf-8')
  )
  const pictures = await generatePictureList('content/pictures')

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
