<script>
	// each step (link) in the sequence
	// steps = [ { path: STRING, label: STRING }, ... ]
	export let steps;

	// a path for the current link
	// -> will be highlighted in the nav
	export let currentPath = '';
</script>

<ol class="timeline">
	{#each steps as step}
	<li>
		<a
			class="step"
			class:current="{step.path === currentPath}"
			class:next="{step.next}"
			class:complete="{step.complete}"
			href="{step.path}"
			title="{step.label}"
		>
			<span class="hide-visually">{step.label}</span>
		</a>
	</li>
	{/each}
</ol>

<style>
	.timeline {
		--dot-size: 1.2em;
		display: flex;
		justify-content: space-between;
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
	}

	.timeline::after {
		--border-w: 1px;
		border-top: var(--border-w) dashed var(--color-secondary);
		content: '';
		display: block;
		left: 0;
		position: absolute;
		right: 0;
		top: 50%;
		z-index: -1;
		margin-top: var(--border-w);
	}

	.step {
		display: block;
		position: relative;
		border-radius: 10000px;
		border: 2px solid var(--color-primary);
		width: var(--dot-size);
		height: var(--dot-size);
		overflow: hidden;
		background-color: var(--color-bg);
	}

	.step::before {
		--margin: 0.19em;
		border-radius: 10000px;
		bottom: var(--margin);
		content: '';
		left: var(--margin);
		opacity: 0;
		position: absolute;
		right: var(--margin);
		top: var(--margin);
		transition: opacity 0.25s ease-in-out;
		will-change: opacity;
		z-index: 1;
	}

	.step:hover::before {
		background-color: var(--color-primary);
		opacity: 1;
	}

	.step.current::before {
		background-color: var(--color-highlight);
		opacity: 1;
	}

	.step.next::before {
		background-color: var(--color-highlight);
		animation: blink 0.5s linear infinite;
	}

	.step.complete {
		border-color: var(--color-secondary);
	}

	.step.complete::before {
		background-color: var(--color-secondary);
		opacity: 1;
	}

	@keyframes blink {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
