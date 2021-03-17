<script>
	import { onDestroy } from 'svelte'
	import { fly } from 'svelte/transition'

	export let list = []

	const interval = 4000
	const duration = 2500
	const delayInterval = 100

	let currentIndex = 0
	$: currentList = list[currentIndex]
	$: newList = currentIndex !== list.length - 1
		? list[currentIndex + 1]
		: list[0]

	function updateIndex() {
		if (currentIndex === list.length - 1) {
			currentIndex = 0
			return
		}
		currentIndex++
	}

	const cycleFavorites = setInterval(updateIndex, interval)
	onDestroy(() => clearInterval(cycleFavorites))
</script>

<dl class="list-undecorated">
	<div class="set">
		<dt class="t-font-accent t-heading t-scale-gamma c-fg-tertiary">
			I like
		</dt>
		{#each currentList as word, index (word)}
			<dd 
				class="t-font-accent t-heading t-scale-gamma c-fg-tertiary"
				in:fly={{ y: 30, duration: duration}}
				out:fly={{ y: -30, duration: duration}}
			>
				{word}
			</dd>
		{/each}
	</div>
</dl>

<style>
	dl {
		font-size: 0;
		position: relative;
	}

	dt,
	dd {
		margin-left: 0;
		display: inline-block;
		position: relative;
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
		display: block;
		position: relative;
		top: 0;
		left: 0;
	}
</style>