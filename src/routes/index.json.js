import fs from 'fs';
import yaml from 'js-yaml';
import render from '@/utils/renderMarkdown.js';
import generateBlogList from '@/utils/generateBlogList.js';
import { findInManifest } from '@/utils/imageHelpers.js';

export function get(req, res) {
	let data = yaml.safeLoad(
		fs.readFileSync('content/home.yml', 'utf-8')
	);

	// table of contents
	const { writing, pictures, design, blog } = data.tableOfContents;

	// writing
	writing.blurb = render(writing.blurb);
	writing.coverImage = findInManifest(writing.coverImage);

	// pictures
	pictures.blurb = render(pictures.blurb);
	pictures.coverImage = findInManifest(pictures.coverImage);

	// design
	design.blurb = render(design.blurb);
	design.coverImage = findInManifest(design.coverImage);

	// blog
	blog.list.posts = generateBlogList(blog.list.source, {
		start: 0,
		end: blog.list.length
	});

	res.writeHead(200, {
		'Content-type': 'application/json'
	});

	res.end(JSON.stringify(data));
}
