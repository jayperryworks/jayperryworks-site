<script>
	export let id // the id attribute for the container, e.g. "blog"
	export let centered
	export let border = true
	export let padding = {
		x: 'outside',
		y: 'xwide'
	}

	$: paddingClasses = Object.keys(padding).map((side) => {
		if (padding[side] === 'default') {
			return `padding-${side}`
		}
		return `padding-${side}-${padding[side]}`
	}).join(' ')

	// append additional classes as needed
	let classes = ''
	export { classes as class }
</script>

<article 
	class="{paddingClasses} | {classes}"
	class:centered="{centered}"
	class:border-seam-top="{border}"
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
