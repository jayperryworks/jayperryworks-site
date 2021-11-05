<script>
	import { fade } from 'svelte/transition';
	import Icon from '@/components/Icon.svelte';
	import warning from 'icons/warning.svg';

	export let title;
</script>

<aside
	class="flag color-bg-primary color-fg-bg solid padding-narrow margin-top-narrow border-round"
	transition:fade
>
	<div class="icon">
		<Icon svg="{warning}" size="large" />
	</div>
	<h3 class="title type-font-accent type-weight-light type-scale-epsilon color-fg-bg">
		{title}
	</h3>
	<p class="content type-font-accent type-weight-light type-scale-zeta">
		<slot></slot>
	</p>
</aside>

<style>
	.flag {
		--gap: var(--space-xnarrow);

		display: grid;
		grid-column-gap: var(--gap, 1em);
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(3, minmax(min-content, max-content)) 1fr;
		grid-template-areas:
			'icon .'
			'icon title'
			'icon content'
			'. content';
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
