// https://astro.build/config
export default {
	compressHTML: true,
	image: {
		domains: [
			'content.jayperry.works',
			'jayperry.works',
			'jayperryworks.com',
			'jpw-api.test',
		],
		layout: 'constrained',
	},
	publicDir: `../../shared/public`,
};
