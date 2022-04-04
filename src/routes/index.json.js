import fs from 'fs';
import yaml from 'js-yaml';
import render from '@/utils/renderMarkdown.js';
import generateBlogList from '@/utils/generateBlogList.js';
import { findInManifest } from '@/utils/imageHelpers.js';

export function get(req, res) {
	let data = yaml.safeLoad(
		fs.readFileSync('content/home.yml', 'utf-8')
	);

	// intro
	data.intro.headline = render(data.intro.headline, { inline: true });
	data.intro.blurb = render(data.intro.blurb);

	// table of contents
	let { writing, pictures, design, blog } = data.tableOfContents;

	function renderTOCItem(item) {
		return {
			...item,
			blurb: render(item.blurb),
			coverImage: findInManifest(item.coverImage)
		}
	}

	data.tableOfContents.writing = renderTOCItem(writing);
	data.tableOfContents.pictures = renderTOCItem(pictures);
	data.tableOfContents.design = renderTOCItem(design);

	// blog
	data.tableOfContents.blog.list.posts = generateBlogList(blog.list.source, {
		start: 0,
		end: blog.list.length
	});

	res.writeHead(200, {
		'Content-type': 'application/json'
	});

	res.end(JSON.stringify(data));
}
