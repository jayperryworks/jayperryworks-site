<script>
	import { fade } from 'svelte/transition';
	import Icon from '@/components/Icon.svelte';
	import warning from 'icons/warning.svg';

	export let title;
	export let transition = {};

	const defaultTransition = {
		duration: 250
	};
</script>

<aside
	transition:fade="{{ ...defaultTransition, ...transition }}"
	class="color-bg-primary color-fg-bg solid padding-narrow margin-top-narrow border-round"
>
	<div class="icon">
		<Icon svg="{warning}" size="large" />
	</div>
	<h3 class="title type-font-accent type-weight-light type-scale-epsilon color-fg-bg">
		{title}
	</h3>
	<p class="content type-font-accent type-weight-light type-scale-zeta padding-top-xnarrow">
		<slot></slot>
	</p>
</aside>

<style>
	/* Cheers to https://www.jayfreestone.com/writing/bulletproof-flag/ for this layout idea */
	aside {
		--gap: var(--space-xnarrow);

		column-gap: var(--gap, 0.5em);
		display: grid;
		grid-template-areas:
			'icon .'
			'icon title'
			'icon content'
			'. content';
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(3, minmax(min-content, max-content)) 1fr;
	}

	.title {
		grid-area: title;
		align-self: center;
		display: flex;
		align-items: center;
	}

	.icon {
		grid-area: icon;
		display: flex;
		align-self: center;
	}

	.content {
		grid-area: content;
	}
</style>
