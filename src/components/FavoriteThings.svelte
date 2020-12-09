<script>
	export let words = []

	function addPunctuation(list) {
		return list.reduce((result, word, index) => {
			result.push(word)
			if (index <= (list.length - 2)) {
				result.push(',')
			}
			if (index === (list.length - 2)) {
				result.push('and')
			}
			return result
		}, [])
	}

	// when currentWords does not match words, add them to .carousel
	let currentWords = addPunctuation(words)
	$: newWords = addPunctuation(words)
	// when these two don't match, trigger a swap, and then set currentWords = newWords

	$: swap = words !== currentWords
</script>

<style>
	p > * {
		display: inline-block;
		position: relative;
		line-height: 1;
		vertical-align: baseline;
	}

	.carousel {
		overflow: hidden;
	}

	.carousel + .carousel {
		margin-left: 0.25em;
	}

	.current {
		top: 0;
	}

	.new {
		display: none;
	}

	.swap > * {

	}
</style>

<p class="c-fg-tertiary | margin-top-xnarrow | t-font-accent t-heading t-scale-gamma">
	<span>I like</span>
	{#each currentWords as word, index}
	<span class="carousel" class:swap>
		<span class="current">{word}</span>
		<span class="new">{newWords[index]}</span>
	</span>
	{/each}
	<span>.</span>
</p>
