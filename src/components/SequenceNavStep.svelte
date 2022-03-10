<script>
	export let path, label;
	export let complete = false;
	export let current = false;
	export let next = false;
	export let tooltipAlign = 'center';
</script>

<li>
	<a
		class="step"
		class:current
		class:next
		class:complete
		href="{path}"
	>
		{@debug tooltipAlign}
		<span class="tooltip {tooltipAlign}">{label}</span>
	</a>
</li>

<style>
	.step {
		--dot-size: 1.2em;
		--transition-duration: 0.25s;

		display: block;
		position: relative;
		border-radius: 10000px;
		border: 2px solid var(--color-primary);
		width: var(--dot-size);
		height: var(--dot-size);
		background-color: var(--color-bg);
		cursor: pointer;
	}

	/* highlight dot */
	.step::before {
		--margin: 0.2em;

		border-radius: 10000px;
		bottom: var(--margin);
		content: '';
		left: var(--margin);
		opacity: 0;
		position: absolute;
		right: var(--margin);
		top: var(--margin);
		transition-duration: var(--transition-duration);
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

	/* tooltip */
	.tooltip {
		--bg: hsl(var(--color-bg-h), var(--color-bg-s), calc(var(--color-bg-l) + 15%));
		--border: var(--color-border);
		--pointer-size: 0.6em;
		--pointer-margin: var(--space-xnarrow);

		background-color: var(--bg);
		border-radius: 0.25em;
		border: 1px solid var(--border);
		bottom: calc(var(--dot-size) + var(--pointer-size) + 1em);
		box-shadow: 0 0.05rem 0.5rem var(--color-shadow);
		color: var(--color-primary);
		content: attr(title);
		display: block;
		font-family: var(--type-font-accent);
		font-size: var(--type-scale-zeta);
		line-height: var(--type-leading-tight);
		max-width: 16rem;
		min-width: 8rem;
		opacity: 0;
		padding: var(--space-xnarrow) var(--pointer-margin);
		position: absolute;
		transition: var(--transition-duration) opacity ease-in-out;
		will-change: opacity;
		z-index: 4;
	}

	.tooltip.start {
		left: calc(var(--pointer-margin) * -1);
		text-align: left;
	}

	.tooltip.end {
		right: calc(var(--pointer-margin) * -1);
		text-align: right;
	}

	.tooltip.center {
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
	}

	.tooltip::before,
	.tooltip::after {
		border-left: var(--pointer-size) solid transparent;
		border-right: var(--pointer-size) solid transparent;
		content: '';
		display: inline-block;
		height: 0;
		position: absolute;
		width: 0;
	}

	.tooltip::before {
		border-top: var(--pointer-size) solid var(--border);
		bottom: calc(var(--pointer-size) * -1);
	}

	.tooltip::after {
		border-top: var(--pointer-size) solid var(--bg);
		bottom: calc((var(--pointer-size) - 0.1em) * -1);
	}

	.tooltip.start::before,
	.tooltip.start::after {
		left: var(--pointer-margin);
	}

	.tooltip.end::before,
	.tooltip.end::after {
		right: var(--pointer-margin);
	}

	.tooltip.center::before,
	.tooltip.center::after {
		left: 50%;
		transform: translateX(-50%);
	}

	.step:hover .tooltip {
		opacity: 1;
	}

	@media screen and (min-width: 45em) {
		/* widen spacing a little on larger screens, where there's more outside room */
		.tooltip {
			--pointer-margin: var(--space-narrow);
		}
	}

	@media screen and (min-width: 55em) {
		/* move all tooltips to be centered on large screens */
		.tooltip.start,
		.tooltip.end {
			left: 50%;
			text-align: center;
			transform: translateX(-50%);
		}

		.tooltip.start::before,
		.tooltip.end::before,
		.tooltip.start::after,
		.tooltip.end::after {
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
