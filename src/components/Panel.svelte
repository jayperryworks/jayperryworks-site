<script>
	export let id // the id attribute for the container, e.g. "blog",
	export let centered

	// append additional classes as needed
	let classes = ''
	export { classes as class }
</script>

<article 
	class="border-seam-top | padding-y-xwide padding-x-outside | {classes}"
	class:centered="{centered}"
	{id}
>
	<slot></slot>
</article>

<style>
	article {
		min-height: 100vh;
	}

	@supports (display: flex) {
		article {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}

	.centered {
		justify-content: center;
	}
</style>
