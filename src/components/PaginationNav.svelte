<script>
	import { titleize } from '@/utils/stringHelpers.js'
	import arrowLeft from 'icons/arrow-left.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import AspectRatio from '@/components/AspectRatio.svelte'
	import Icon from '@/components/Icon.svelte'
	import ResponsiveImage from '@/components/ResponsiveImage.svelte'

	export let items = [];
	export let itemWidth = 25;

	$: style = `--item-width: ${itemWidth}rem;`

	function label (item) {
		if (item.label) {
			return item.label;
		}
		return;
	}
</script>

<ul {style}>
	{#each items as item}
		{#if item}
			<li
				class="gutter"
				class:previous="{item.direction === 'previous'}"
				class:next="{item.direction === 'next'}"
			>
				{#if item.thumbnail}
					<a
					  class="thumbnail type-link-undecorated margin-bottom"
					  href="{item.path}"
					>
					    <ResponsiveImage
								class="border solid"
					      sources="{item.thumbnail}"
					      alt="{item.label}"
					    />
					</a>
				{/if}
				<a
					class="label type-link-undecorated type-scale-gamma type-heading"
					href="{item.path}"
				>
					{#if item.direction === 'previous'}
						<Icon
							svg="{arrowLeft}"
							class="arrow left"
						/>
					{/if}
					<span>
						{item.label || titleize(item.direction)}
					</span>
					{#if item.direction === 'next'}
						<Icon
							svg="{arrowRight}"
							class="arrow right"
						/>
					{/if}
				</a>
			</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding-left: 0;
	}

	li {
		align-items: start;
		flex-direction: column;
		justify-self: start;
		max-width: var(--item-width);
	  display: flex;
	}

	li + li {
	  padding-top: 1em;
	  padding-top: var(--space-medium);
	}

	.label {
		align-items: center;
		display: flex;
		margin-top: auto;
		max-width: var(--item-width);
	}

	.label > :global(* + *) {
		display: inline-block;
		margin-left: 1em;
		margin-left: var(--space-xnarrow);
	}

	@media screen and (min-width: 30em) {
		@supports (display: grid) {
		  ul {
		    display: grid;
		    grid-gap: var(--space-medium);
		    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		  }

		  li + li {
		  	padding-top: 0;
		  }

		  li.next {
				align-items: end;
		    justify-self: end;
		    text-align: right;
		  }

	  	.thumbnail {
				--size: 8rem;
				display: block;
				overflow: hidden;
				width: 100%;
	    }

			.thumbnail > :global(img) {
				max-height: var(--size);
			}
		}
	}

	@media screen and (min-width: 48em) {
		.thumbnail {
			--size: 12rem;
		}
	}

	@media screen and (min-width: 75em) {
		.thumbnail {
			--size: 16rem;
		}
	}
</style>
