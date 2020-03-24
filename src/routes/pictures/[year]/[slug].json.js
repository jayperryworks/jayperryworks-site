import fs from 'fs'
import yaml from 'js-yaml'
import render from '@/utils/renderMarkdown.js'
import imageHelpers from '@/utils/imageHelpers.js'

export function get(req, res, next) {
	const { year, slug } = req.params
	const header = {
		'Content-Type': 'application/json'
	}

	let content = yaml.safeLoad(
		fs.readFileSync(`content/pictures/${year}-${slug}.yml`, 'utf-8')
	)

	if (!content) {
		res.writeHead(404, header)
		res.end(JSON.stringify({
			message: 'Oh dear, this bicycle has gone rubber-side-up. Much appreciated if you could let <a href="https://twitter.com/inkpixelswords" target="_blank">@inkpixelswords</a> know.'
		}))
		return
	}

	// render the markdown bits
	if (content.intro) {
		content.intro = render(content.intro)
	}

	if (content.cover) {
		content.cover = imageHelpers.versions(content.cover)
	}

	// grab info about the print editions, if there are any
	if (content.editions) {
		const info = yaml.safeLoad(
			fs.readFileSync('content/pictures.yml', 'utf-8')
		)

		// get unique edition types for this picture, e.g. 'giclee'
		// -> https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
		const types = [...new Set(content.editions.map(edition => edition.type))]

		// get the descriptions for each type of print and add to the content object
		content.printDescriptions = types.map(type => {
			const note = info.printDescriptions.find(item => item.type == type)

			return {
				type: note.type,
				description: render(note.description) // render the markdown for each
			}
		})
	}

	res.writeHead(200, header)
	res.end(JSON.stringify(content))
}
