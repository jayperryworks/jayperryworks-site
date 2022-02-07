<script>
	import { helpers } from 'css/color.js'

	export let highlight = helpers.getValue('highlight');
	export let primary = helpers.getValue('primary');
	export let secondary = helpers.getValue('secondary');
	export let bg = helpers.getValue('bg');
	export let border = helpers.getValue('border');
	export let shadow = helpers.getValue('shadow');

	export let color = highlight;

	$: theme = { highlight, primary, secondary, bg, border, shadow };


	// if no background, use the default
	// if no primary, make a very dark version of the bg
	// if no secondary, make a lighter version of primary
	// if no border, make an even lighter version of primary
	// if no shadow, make a darker translucent version of the bg
	// if no highlight, use primary

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
