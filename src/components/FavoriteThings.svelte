<script>
	import { onDestroy } from 'svelte'

	export let list = []
	export let speed = 2000

	let currentListIndex = 0

	function updateFavoriteThings() {
		if (currentListIndex === list.length - 1) {
			currentListIndex = 0
			return
		}
		currentListIndex++
	}

	const cycleFavorites = setInterval(updateFavoriteThings, speed)
	onDestroy(() => clearInterval(cycleFavorites))
</script>

<style>
	dt,
	dd {
		margin-left: 0;
		display: inline-block;
	}

	dt + dd,
	dd + dd {
		margin-left: 0.2em;
	}

	dd::after {
		content: ', ';
	}

	dd:last-child::after {
		content: '.';
	}

	dd:last-child::before {
		content: ' and ';
	}

	.set {
		display: none;
		transition: all 0.25s ease-in-out;
	}

	.current {
		display: block;
	}
</style>

<dl class="c-fg-tertiary | margin-top-xnarrow | t-font-accent t-heading t-scale-gamma | list-undecorated">
	{#each list as set, index}
		<div class="set" class:current={index === currentListIndex}>
			<dt>I like</dt>
			{#each set as word}
				<dd>{word}</dd>
			{/each}
		</div>
	{/each}
</dl>
