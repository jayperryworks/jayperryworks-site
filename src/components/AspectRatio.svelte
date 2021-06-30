<script>
	import { helpers as scale } from 'css/scale.js'

	export let ratio = "2/1"
	export let useScale = true
	let classes = ''
	export { classes as class }

	function convertToScale() {
		return ratio
			.split('/')
			.map(interval => scale.get(interval, { unit: false }))
			.join('/')
	}

	$: style = `--ratio: ${useScale ? convertToScale() : ratio};`
</script>

<div
	class="aspect-ratio {classes}"
	{style}
>
	<div class="content">
		<slot></slot>
	</div>
</div>

<style>
	.aspect-ratio {
	  position: relative;
	  width: 100%;
	}

  .aspect-ratio::before {
    content: '';
    display: block;
    padding-top: calc((1 / var(--ratio)) * 100%);
  }

  @supports (aspect-ratio: 1) {
  	.aspect-ratio {
  		aspect-ratio: var(--ratio);
  	}

  	.aspect-ratio::before {
  		content: none;
  	}
  }

	.content {
	  height: 100%;
	  left: 0;
	  position: absolute;
	  top: 0;
	  width: 100%;
	  display: block;
	}
  
  @supports (display: flex) {
  	.content {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	  }
	}
</style>