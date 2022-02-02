<script>
	import { helpers } from 'css/color.js'

	export let color;
	// {
	// 	role: {
	// 		h: [VALUE],
	// 		s: [VALUE],
	// 		l: [VALUE]
	// 	}
	// }
	export let theme = {};

	$: colorValues = color || helpers.getValue('highlight');

	$: colorVariables = Object.keys(theme).map((role) => {
		const values = theme[role];
		if (values) {
			return Object.keys(values).map((channel) => {
				if (role === 'background') role = 'bg';
				const unit = channel !== 'h' ? '%' : '';
				return `--color-${role}-${channel}: ${values[channel]}${unit};`;
			}).join('');
		}
	}).join('');

	$: style = `
	    <st${''}yle>
	      :root {
					${colorVariables}
	      }
	    </st${''}yle>
	  `;
</script>

<svelte:head>{@html style}</svelte:head>
