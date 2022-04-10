// Adapted from https://piccalil.li/blog/a-modern-css-reset/
const name = 'Reset';

// base styles
const base = `
	/* Box sizing rules */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	/* Remove default margin */
	body,
	h1,
	h2,
	h3,
	h4,
	p,
	figure,
	blockquote,
	dl,
	dd {
		margin: 0;
	}

	/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
	ul[role='list'],
	ol[role='list'] {
		list-style: none;
	}

	/* Set core root defaults */
	html:focus-within {
		scroll-behavior: smooth;
	}

	/* Set core body defaults */
	html {
		min-height: 100vh;
	}

	body {
		line-height: 1.5;
		margin: 0;
		min-height: 100vh;
		text-rendering: optimizeLegibility;
		font-variant-ligatures: contextual;
	}

	/* Elements that don't have a class get default styles */
	a:not([class]) {
		text-decoration-skip-ink: auto;
	}

	/* Make images easier to work with */
	/* -> cheers to https://www.zachleat.com/web/fluid-images/ */
	img {
		max-width: 100%;
	}
	
	img[width] {
		width: auto; /* Defer to max-width */
	}
	
	img[width][height] {
		height: auto; /* Preserve aspect ratio */
	}

	/* Let SVG scale without boundaries */
	img[src$=".svg"] {
  	width: 100%;
 		height: auto;
		max-width: none;
	}

	svg {
		height: 100%;
		width: 100%;
	}

	/* Inherit fonts for inputs and buttons */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
	@media (prefers-reduced-motion: reduce) {
		html:focus-within {
			scroll-behavior: auto;
		}

		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}
`;

// css output
export { name, base };
