<script>
	import arrowLeft from 'icons/arrow-left.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import Icon from '@/components/Icon.svelte'

	export let items = []
	export let itemWidth = 18

	$: style = `--item-width: ${itemWidth}rem;`
</script>

<ul
	class="pagination gutter-wrapper narrow hide-overflow"
	{style}
>
	<slot>
		{#each items as item}
			{#if item}
				<li
					class="gutter"
					class:previous="{item.direction === 'previous'}"
					class:next="{item.direction === 'next'}"
				>
					<a
						class="type-link-undecorated type-scale-gamma type-heading"
						href="{item.link}"
					>
						{#if item.direction === 'previous'}
							<Icon
								svg="{arrowLeft}"
								margin="right"
							/>
						{/if}
						<span class="label">
							{item.label}
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
	</slot>
</ul>

<style>
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
	}

	.label {
		display: inline-block;
	}
</style>