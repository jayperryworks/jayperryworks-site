<script>
	import { helpers } from 'css/color.js'

	export let color

	$: colorValues = color || helpers.getValue('highlight')
	$: style = `
	    <style>
	      :root {
	        --color-highlight-h: ${colorValues.h};
	        --color-highlight-s: ${colorValues.s}%;
	        --color-highlight-l: ${colorValues.l}%;
	      }
	    </style>
	  `
</script>

<svelte:head>{@html style}</svelte:head>