<script>
	import { onDestroy } from 'svelte'

	export let list = []
	export let speed = 4000

	let currentListIndex = 0
	$ : previousListIndex = currentListIndex > 0 
		? currentListIndex - 1 
		: list.length - 1

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
	dl {
		font-size: 0;
		position: relative;
		height: 2.5rem;
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

	dd {
		opacity: 0;
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
		--delay: 0.25s;
		--duration: 0.25s;
		position: absolute;
		top: 0;
		left: 0;
		height: 2.5rem;
		overflow: hidden;
	}

	.set:not(:first-child) > dt {
		visibility: hidden;
	}

	.set > dd {
		transition: 
			opacity var(--duration) ease var(--delay, 0), 
			top var(--duration) ease var(--delay, 0);
		top: 2.5rem;
		opacity: 0;
	}

	.current > dd {
		top: 0;
		opacity: 1;
	}

	.previous > dd {
		top: -2.5rem;
	}
</style>

<dl class="margin-top-xnarrow | list-undecorated">
	{#each list as set, index}
		<div 
			class="set" 
			class:current={index === currentListIndex}
			class:previous={index === previousListIndex}
		>
			<dt class="t-font-accent t-heading t-scale-gamma c-fg-tertiary">
				I like
			</dt>
			{#each set as word, index}
				<dd 
					class="t-font-accent t-heading t-scale-gamma c-fg-tertiary"
					style="--delay: {index * 0.1}s;"
				>
					{word}
				</dd>
			{/each}
		</div>
	{/each}
</dl>
