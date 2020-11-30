import fs from 'fs'
import yaml from 'js-yaml'
import render from '../utils/renderMarkdown.js'
import generateBlogList from '@/utils/generateBlogList.js'
import { findInManifest } from '@/utils/imageHelpers.js'

export function get(req, res) {
	let data = yaml.safeLoad(
		fs.readFileSync('content/home.yml', 'utf-8')
	)

	data.tableOfContents.forEach((item) => {
		if (item.content) {
			if (item.content.type == 'image') {
				item.content.image = findInManifest(item.content.image)
			}

			if (item.content.type == 'list') {
				item.content.posts = generateBlogList('content/blog', {
					start: 0,
					end: item.content.length
				})
			}
		}

		return item
	})

	res.writeHead(200, {
		'Content-type': 'application/json'
	})

	res.end(JSON.stringify(data))
}
