import fs from 'fs'

export function findInManifest(image, {
	manifestPath = 'static/images/resizes/_manifest.json'
} = {}) {
	try {
		const data = JSON.parse(
			fs.readFileSync(manifestPath)
		)
		return data.find(resizeData => resizeData.original === image)
	} catch(error) {
		console.log(`Sorry, the manifest can't be found. Try running the optimizeImages script again. | ${error}`)
	}
}
