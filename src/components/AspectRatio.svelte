<script>
	import { helpers as scale } from 'css/scale.js'

	export let ratio = "2/1"
	export let useScale = true
	let classes = ''
	export { classes as class }

	$: ratioNumbers = ratio.split('/').map((interval) => {
			if (useScale) {
				return scale.get(interval, { unit: false })
			}
			return parseFloat(interval)
		})

	$: style = `
		--ratio: ${ratioNumbers[0]}/${ratioNumbers[ratioNumbers.length - 1]};
		--reciprocal-ratio: ${ratioNumbers[ratioNumbers.length - 1] / ratioNumbers[0]};
	`
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
    padding-top: 100%; /* non-variable fallback - simple square */
    padding-top: calc(var(--reciprocal-ratio) * 100%);
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