import fs from 'fs'
import yaml from 'js-yaml'
import render from '@/utils/renderMarkdown.js'
import renderPostBody from '@/utils/renderPostBody.js'
import { findInManifest } from '@/utils/imageHelpers.js'

export function get(req, res, next) {
	const { year, slug } = req.params
	const header = {
		'Content-Type': 'application/json'
	}

	let data = yaml.safeLoad(
		fs.readFileSync(`content/design/${year}-${slug}.yml`, 'utf-8')
	)

	if (!data) {
		res.writeHead(404, header)
		res.end(JSON.stringify({
			message: 'Oh dear, this bicycle has gone rubber-side-up. Much appreciated if you could let <a href="https://twitter.com/inkpixelswords" target="_blank">@inkpixelswords</a> know.'
		}))
		return
	}

	// render markdown as needed
	data.body = renderPostBody(data.body)

	res.writeHead(200, header)
	res.end(JSON.stringify({ ...data }))
}