<script>
	import { helpers } from 'css/color.js'

	export let bg = helpers.getValue('bg');
	export let primary = helpers.getValue('primary');
	export let secondary = helpers.getValue('secondary');
	export let border = helpers.getValue('border');
	export let shadow = helpers.getValue('shadow');
	export let highlight = helpers.getValue('highlight');

	export let color = highlight;

	$: theme = { bg, primary, secondary, highlight, border, shadow };

	$: colorVariables = Object.keys(theme).map((role) => {
		const values = theme[role];

		if (values) {
			return helpers.setCustomProperty(role, values);
		}
	}).join('');

	// Need to 'escape' the <style> tag because the Svelte compiler gets mad when a literal is injected like this
	// -> https://github.com/sveltejs/kit/issues/3128
	$: style = `
	    <st${''}yle>
	      :root {
					${colorVariables}
	      }
	    </st${''}yle>
	  `;
</script>

<svelte:head>{@html style}</svelte:head>
