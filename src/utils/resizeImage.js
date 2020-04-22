const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// create responsive, optimized versions of an original image
// Returns an object:
// {
//   "original": "/path/to/big/original/image.jpg",
//   "versions": [
//     {
// 			"format": "jpg",
// 			"default": true,
// 			"sizes": [
//         {
//           "path": "/path/to/resized/image@[SIZE]w.jpg",
//           "size": "[SIZE]"
//         }
//       ]
//     },
// 		 ...
//   ]
// }
module.exports = async (sourcePath, {
	widths = [600, 1200, 1600, 2000],
	formats = ['jpg', 'webp'],
	// the path where the output images with go
	outputPath = '/images/resizes',
	// the uncompiled/server path prepended to outputPath
	outputPrefix = 'static'
} = {}) => {
	// grab the filename form the sourcePath param
	const sourceFileName = path.parse(sourcePath).name
	// create server paths for files (pre-export)
	const sourceFileOnServer = `${outputPrefix}${sourcePath}`
	const outputFileOnServer = `${outputPrefix}${outputPath}`
	// get source image metadata (width)
	const metadata = await sharp(sourceFileOnServer).metadata()

	// if the output folder doesn't exist, write it
	if (!fs.existsSync(outputFileOnServer)) {
		fs.mkdirSync(outputFileOnServer)
	}

	// build a new data object for all the image versions
	const versionData = {
		original: sourcePath,
		versions: formats.map((format, index) => {
			// add an object with format and size data to the array
			return {
				format,
				// set the first format in the array as the default/fallback
				default: index === 0,
				// make versions of the image at each width but only if:
				// - the file does not already exist
				// - the version is smaller than the original
				sizes: widths.reduce((result, width) => {
					const path = `${outputPath}/${sourceFileName}@${width}w.${format}`

					if (metadata.width >= width) {
						// add an object with path and size info to the array
						result.push({
							path,
							size: width
						})
					}

					return result
				}, [])
			}
		})
	}

	// resize all the images and save out files
	// use Promise.all to do these all at once
	await Promise.all(versionData.versions.map(async (version) => {
		version.sizes.map(async (width) => {
			// if the file does not exist...
			if (!fs.existsSync(path.join(__dirname, sourceFileOnServer))) {
				await sharp(sourceFileOnServer)
					.resize({ width: width.size })
					.toFormat(version.format)
					.toFile(`${outputPrefix}${width.path}`)
			}
		})
	}))

	return versionData
}
