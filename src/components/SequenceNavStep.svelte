<script>
	export let path, label;
	export let complete = false;
	export let current = false;
	export let next = false;
</script>

<li>
	<a
		class="step"
		class:current
		class:next
		class:complete
		href="{path}"
		title="{label}"
	>
		<span class="hide-visually">{label}</span>
	</a>
</li>

<style>
	.step {
		--dot-size: 1.2em;

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
		transition-duration: 0.25s;
		transition-property: opacity, background-color;
		transition-timing-function: ease-in-out;
		will-change: opacity, background-color;
		z-index: 1;
	}

	.step.current::before {
		background-color: var(--color-highlight);
		opacity: 1;
	}

	.step.next::before {
		background-color: var(--color-highlight);
		animation: blink 1s ease infinite alternate;
	}

	.step.complete {
		border-color: var(--color-secondary);
	}

	.step.complete::before {
		background-color: var(--color-secondary);
		opacity: 1;
	}

	.step:hover::before {
		background-color: var(--color-primary);
		opacity: 1;
		animation: none;
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
