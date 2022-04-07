import fs from 'fs'
import generateBlogList from '@/utils/generateBlogList.js'
import { findInManifest } from '@/utils/imageHelpers.js'

export function get(req, res) {
	const { number } = req.params
	const postsPerPage = 10
	const totalPosts = fs.readdirSync('content/blog').length
	const totalPages = Math.ceil(totalPosts / postsPerPage)

	const posts = generateBlogList('content/blog', {
			start: ((number - 1) * postsPerPage),
			end: (number * postsPerPage)
		})

	// create responsive resizes of images as needed
	posts.forEach((post) => {
		// resize the cover
		if (post.cover && post.cover.resize) {
	  	post.cover.image = findInManifest(post.cover.image)
	  }

	  // excerpt
	  // check for figures & resize as needed
	  const figures = post.excerpt.filter((section) => {
	  	return section.type === 'figure' && section.resize
	  })

		if (figures.length > 0) {
			figures.forEach((figure) => {
				figure.image = findInManifest(figure.image)
			})
		}

		// check for galleries & resize as needed
		const galleries = post.excerpt.filter((section) => {
			return section.type === 'gallery'
				&& section.images.find(image => image.resize)
		})

		if (galleries.length > 0) {
			galleries.forEach((gallery) => {
				gallery.images.forEach((item) => {
					if (item.resize) {
						item.image = findInManifest(item.image)
					}
				})
			})
		}
	})

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(JSON.stringify(
		{
			totalPages,
			posts
		}
	))
}
