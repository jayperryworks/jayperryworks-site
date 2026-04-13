// https://astro.build/config
export default {
	compressHTML: true,
	image: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.jayperry.works',
			},
			{
				protocol: 'https',
				hostname: '*.jayperryworks.com',
			},
			{
				protocol: 'https',
				hostname: 'jayperryworks-design.netlify.app',
			},
			{
				protocol: 'https',
				hostname: 'jayperryworks.netlify.app',
			},
			{
				protocol: 'http',
				hostname: 'jpw-api.test',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
			},
		],
		layout: 'constrained',
	},
	publicDir: `../../shared/public`,
};
