<script>
	import { titleize } from '@/utils/stringHelpers.js'
	import arrowLeft from 'icons/arrow-left.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import AspectRatio from '@/components/AspectRatio.svelte'
	import Icon from '@/components/Icon.svelte'
	import ResponsivePicture from '@/components/ResponsivePicture.svelte'

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

<ul
	class="pagination gutter-wrapper narrow hide-overflow"
	{style}
>
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
					    <ResponsivePicture
					      sources="{item.thumbnail.versions}"
					      alt="{item.label}"
					      cover
					    />
					  </AspectRatio>
					</a>
				{/if}
				<a
					class="type-link-undecorated type-scale-gamma type-heading"
					href="{item.path}"
				>
					{#if item.direction === 'previous'}
						<Icon
							svg="{arrowLeft}"
							margin="right"
						/>
					{/if}
					<span class="label">
						{item.label || titleize(item.direction)}
					</span>
					{#if item.direction === 'next'}
						<Icon
							svg="{arrowRight}"
							margin="left"
						/>
					{/if}
				</a>
			</li>
		{/if}
	{/each}
</ul>

<style>
	@media screen and (min-width: 40em) {
		@supports (display: flex) {
		  .pagination {
		    display: flex;
		    justify-content: space-between;
		    flex-wrap: wrap;
		  }

		  .pagination :global(li),
		  .item {
		    flex: 0 1 var(--item-width);
		    display: flex;
		    flex-wrap: wrap;
		  }

		  .pagination :global(li.next),
		  .item.next {
		    margin-left: auto;
		    justify-content: flex-end;
		  }

	  	.thumbnail {
	      width: 100%;
	    }
		}
	}

	.label {
		display: inline-block;
	}
</style>