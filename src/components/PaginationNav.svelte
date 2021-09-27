<script>
	import { titleize } from '@/utils/stringHelpers.js'
	import arrowLeft from 'icons/arrow-left.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import AspectRatio from '@/components/AspectRatio.svelte'
	import Icon from '@/components/Icon.svelte'
	import ResponsiveImage from '@/components/ResponsiveImage.svelte'

	export let items = []
	export let itemWidth = 18

	$: style = `--item-width: ${itemWidth}rem;`

	function label (item) {
		if (item.label) {
			return item.label
		}
		return 
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
					  class="thumbnail type-link-undecorated padding-bottom"
					  href="{item.path}"
					>
					  <AspectRatio class="border solid">
					    <ResponsiveImage
					      sources="{item.thumbnail}"
					      alt="{item.label}"
					      cover
					    />
					  </AspectRatio>
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
	  display: flex;
	  flex-wrap: wrap;
	}

	li + li {
	  padding-top: 1em;
	  padding-top: var(--space-medium);
	}

	.label {
		align-items: center;
		display: flex;
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
		    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		    grid-gap: var(--space-medium);
		  }

		  li + li {
		  	padding-top: 0;
		  }

		  li.next {
		    justify-self: end;
		    text-align: right;
		  }

	  	.thumbnail {
	      width: 100%;
	    }
		}
	}
</style>