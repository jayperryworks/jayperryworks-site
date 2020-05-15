const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const imageHelpers = require('../src/utils/imageHelpers.js')

// [
// 	{
// 	  "original": "/path/to/big/original/image.jpg",
// 	  "versions": [
// 	    {
// 				"format": "jpg",
// 				"default": true,
// 				"sizes": [
// 	        {
// 	          "path": "/path/to/resized/image@[SIZE]w.jpg",
// 	          "size": "[SIZE]"
// 	        }
// 	      ]
// 	    },
// 			 ...
// 	  ]
// 	},
// 	...
// ]

function getFile (file) {
	try {
		return yaml.safeLoad(
		  fs.readFileSync(path.join(__dirname, file), 'utf-8')
		)
	} catch(error) {
		console.log(`Sorry, I can't find this file: ${error}`)
	}
}

function getDir (dir) {
	try {
		const dirPath = path.join(__dirname, dir)

		return fs.readdirSync(dirPath).reduce((result, file) => {
			// skip system dotfiles
		  if (file[0] === '.') return result

			result.unshift(yaml.safeLoad(
			  fs.readFileSync(`${dirPath}/${file}`, 'utf-8')
			))

			return result
		}, [])
	} catch(error) {
		console.log(`Sorry, I can't find this directory: ${error}`)
	}
}

// thumb width: [400, 800, 1000]
function getPictureImages (dir) {
	return getDir(dir).reduce((result, data) => {
		const images = [
			data.cover,
			data.thumb,
			...(data.editions && data.editions.map(edition => edition.photo))
		]
		images.forEach((original) => {
			result.push({ original })
		})
		return result
	}, [])
}

function getWritingImages (dir) {
	return getDir(dir).reduce((result, data) => {
		let images = []
		// cover image
		data.cover && data.cover.resize && images.push(data.cover.image)
		// body block images
		data.body.forEach((block) => {
			if (block.resize) {
				block.image && images.push(block.image)
				block.images && block.images.map((item) => {
					images.push(item.image)
				})
			}
		})
		images.forEach((original) => {
			result.push({ original })
		})
		return result
	}, [])
}

function getAboutImages (file) {
	const data = getFile(file)
	// same as writing images, but optimize all of them
	return [
		(data.cover && data.cover.image),
		...data.body.reduce((result, block) => {
			block.image && result.push(block.image)
			block.images && result.push(
				...block.images.map(item => item.image)
			)
			return result
		}, [])
	].map((image) => {
		return { original: image }
	})
}

function getHomeImages (file) {
	const data = getFile(file)

	return [
		{ original: data.cover.image }
	]
}

async function resizeAndGenerateManifest (images) {
	const data = await Promise.all(images.map(async (image) => {
		return await imageHelpers.resizeImage(image.original, image.options)
	}))

	fs.writeFileSync(
		path.join(__dirname, '../static/images/resizes/_manifest.json'),
		JSON.stringify(data)
	)
}

resizeAndGenerateManifest([
	...getWritingImages('../content/writing'),
	...getPictureImages('../content/pictures'),
	...getAboutImages('../content/about.yml'),
	...getHomeImages('../content/home.yml')
])