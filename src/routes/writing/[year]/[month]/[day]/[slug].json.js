import fs from 'fs'
import yaml from 'js-yaml'
import renderMarkdown from '@/utils/renderMarkdown.js'
import renderPostBody from '@/utils/renderPostBody.js'
import resizeImage from '@/utils/resizeImage.js'

export async function get(req, res, next) {
	const { year, month, day, slug } = req.params
	const header = {
		'Content-Type': 'application/json'
	}

	let data = yaml.safeLoad(
		fs.readFileSync(
			`content/writing/${year}-${month}-${day}-${slug}.yml`,
			'utf-8'
		)
	)

	if (!data) {
		res.writeHead(404, header)
		res.end(JSON.stringify({
			message: 'Oh dear, this bicycle has gone rubber-side-up. Much appreciated if you could let <a href="https://twitter.com/inkpixelswords" target="_blank">@inkpixelswords</a> know.'
		}))
	}

	if (data.cover) {

		// resize the cover image if needed
		if (data.cover.resize) {
			data.cover.image = await resizeImage(data.cover.image)
		}

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

	// render markdown as needed
	data.body = renderPostBody(data.body)

	await Promise.all(data.body.map(async (block) => {
		// if it has an 'image' field (e.g. figure), resize it
		if (block.image && block.resize) {
			block.image = await resizeImage(block.image)
		}

		if (block.images) {
			// if it has an 'images' field (e.g. gallery), resize each
			block.images.map(async (item) => {
				if (item.resize) {
					item.image = await resizeImage(item.image)
				}
			})
		}
	}))

	// create responsive resizes of images as needed

	res.writeHead(200, header)
	res.end(JSON.stringify(data))
}
