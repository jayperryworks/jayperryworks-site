import fs from 'fs'
import yaml from 'js-yaml'
import generateBlogList from '@/utils/generateBlogList.js'
import renderMarkdown from '@/utils/renderMarkdown.js'
import renderPostBody from '@/utils/renderPostBody.js'
import { findInManifest } from '@/utils/imageHelpers.js'

export function get(req, res, next) {
	const { year, month, day, slug } = req.params
	const header = {
		'Content-Type': 'application/json'
	}

	const path = ``

	let data = yaml.safeLoad(
		fs.readFileSync(
			`content/blog/${year}-${month}-${day}-${slug}.yml`,
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
			data.cover.image = findInManifest(data.cover.image)
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

	// resize images as needed
	data.body.forEach((block) => {
		if (block.resize) {
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
		}
	})

	// get all blog posts for the prev/next page nav
	const postList = generateBlogList('content/blog')
	const thisPost = postList.find(({ path }) => {
		return path === `blog/${year}/${month}/${day}/${slug}`
	})
	const prevPost = postList[postList.indexOf(thisPost) - 1]
	const nextPost = postList[postList.indexOf(thisPost) + 1]

	res.writeHead(200, header)
	res.end(JSON.stringify({ ...data, previous: prevPost, next: nextPost }))
}
