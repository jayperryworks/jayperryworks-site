const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

fs.readdir('./scripts/admin/blocks', (err, files) => {
	if (err) throw err

	files.forEach(file => {
		const data = yaml.load(fs.readFileSync(`./scripts/admin/blocks/${file}`))

		console.log(data)

		fs.writeFile(
		  path.join(__dirname, `./scripts/admin/new/${path.parse(file).name}.js`),
		  JSON.stringify(data),
		  (err) => {
		  	if (err) throw err
	  		console.log('done!')
		  }
		)
	})
})
