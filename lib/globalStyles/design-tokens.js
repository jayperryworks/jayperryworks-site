// scale ratio
const scale = 1.2;

// color scheme
const color = {};

color.palette = {
	black: { h: 0, s: 0, l: 27 },
	gray: { h: 223, s: 7, l: 78 },
	green: { h: 148, s: 43, l: 66 },
	lavendar: { h: 223, s: 75, l: 70 },
	orange: { h: 38, s: 86, l: 64 },
	red: { h: 345, s: 74, l: 58 },
	white: { h: 0, s: 0, l: 100 },
};

color.themes = {
	dark: {
		primary: color.palette.white,
		secondary: { ...color.palette.gray, l: 40 },
		highlight: color.palette.lavendar,
		bg: color.palette.black,
		island: { ...color.palette.black, l: 35 },
		well: { ...color.palette.black, l: 17 },
		border: { ...color.palette.black, l: 20 },
		shadow: { ...color.palette.black, l: 0, a: 0.4 },
	},
	default: {
		primary: color.palette.black,
		secondary: { ...color.palette.gray, l: 65 },
		highlight: color.palette.lavendar,
		bg: color.palette.white,
		island: color.palette.white,
		well: { ...color.palette.gray, l: 90 },
		border: color.palette.gray,
		shadow: { ...color.palette.gray, a: 0.6 },
	},
};

// type treatments
const type = {
	fonts: [
		{
			name: 'Publico Headline',
			stack: "'Publico', 'Georgia', 'Times', 'Times New Roman', serif",
			role: 'display',
			formats: ['woff', 'ttf'],
			variants: [
				{
					weight: 'normal',
					file: '/assets/fonts/PublicoHeadline-Roman-Web',
				},
			],
		},
		{
			name: 'Publico Text',
			stack: "'Publico', 'Georgia', 'Times', 'Times New Roman', serif",
			role: 'body',
			formats: ['woff', 'ttf'],
			variants: [
				{
					weight: 'normal',
					file: '/assets/fonts/PublicoText-Roman-Web',
				},
				{
					weight: 'normal',
					style: 'italic',
					file: '/assets/fonts/PublicoText-Italic-Web',
				},
			],
		},
		{
			name: 'System',
			stack: "system-ui, -apple-system, BlinkMacSystemFont, 'Avenir Next', 'Avenir', 'Segoe UI', 'Lucida Grande', 'Helvetica Neue', 'Helvetica', 'Fira Sans', 'Roboto', 'Noto', 'Droid Sans', 'Cantarell', 'Oxygen', 'Ubuntu', 'Franklin Gothic Medium', 'Century Gothic', 'Liberation Sans', sans-serif",
			role: 'accent',
		},
	],
	scale: {
		alpha: { base: 4, fluid: 5, max: 7 },
		beta: { base: 3, fluid: 3, max: 6 },
		gamma: { base: 2, fluid: 2, max: 4 },
		delta: { base: 1, fluid: 1, max: 2 },
		epsilon: { base: 1 },
		zeta: { base: 0 },
	},
	screenScale: [
		{
			screen: 'default',
			size: 100,
		},
		{
			screen: 'small',
			size: 105,
		},
		{
			screen: 'medium',
			size: 110,
		},
		{
			screen: 'xlarge',
			size: 120,
		},
	],
	leading: {
		xtight: 1.2,
		tight: 1.3,
		default: 1.8,
	},
	// width of a line of body text, in characters (ch units)
	lineMeasure: 60,
};

const spacing = {
	scale: {
		xxnarrow: -8,
		xnarrow: -2,
		narrow: 0,
		medium: 3,
		wide: 6,
		xwide: 10,
	},
	outside: {
		default: 'narrow',
		small: 'medium',
		medium: 'wide',
	},
};

const contentWidths = {
	narrow: 30,
	default: 40,
	wide: 64,
	xwide: 75,
	xxwide: 112,
};

const borders = {
	spine: {
		default: {
			width: 0.35,
			unit: 'rem',
		},
		small: {
			width: 0.6,
			unit: 'rem',
		},
	},
	seam: {
		marker: {
			h: 0.5,
			unit: 'rem',
		},
		image: '/images/seam.svg',
	},
	widths: {
		default: 1,
		thick: 4,
		unit: 'px',
	},
	radius: {
		size: 0.2,
		unit: 'em',
	},
};

const breakpoints = {
	sizes: {
		xsmall: 30,
		small: 42,
		medium: 62,
		large: 75,
		xlarge: 100,
	},
	unit: 'em',
};

export {
	scale,
	color,
	spacing,
	contentWidths,
	borders,
	type,
	breakpoints,
};
