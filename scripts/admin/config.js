const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

// collections config
const blog = require('./collections/blog.js')
const pictures = require('./collections/pictures.js')

// pages config
const home = require('./pages/home.js')
const about = require('./pages/about.js')

// pull CMS config from content folder
const {	url,	git } = yaml.load(
	fs.readFileSync(path.join(__dirname, '../../content/site.yml'))
)

// create the Yaml admin config from this JS object
// -> allows us to break it up into reusable modules
fs.writeFileSync(
  path.join(__dirname, '../../static/admin/config.yml'),
  yaml.dump({
		backend: {
		  name: git.host,
		  repo: git.repository,
		  branch: git.deployBranch
		},
		media_folder: 'source/assets/uploads',
		public_folder: '/uploads',
		site_url: url,
		publish_mode: 'editorial_workflow',
		collections: [
			blog,
			pictures,
			{
				label: 'Pages',
				name: 'pages',
				editor: {
					preview: false
				},
				files: [
					home,
					about
				]
			}
		]
	})
)
