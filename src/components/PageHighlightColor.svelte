<script>
	export let color

	$: style = color 
		? `
		    <style>
		      :root {
		        --color-highlight-h: ${color.h};
		        --color-highlight-s: ${color.s}%;
		        --color-highlight-l: ${color.l}%;
		      }
		    </style>
		  `
	  : '<style></style>'
</script>

<svelte:head>{@html style}</svelte:head>