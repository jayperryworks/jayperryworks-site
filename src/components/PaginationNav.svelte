<script>
	import arrowLeft from 'icons/arrow-left.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import Icon from '@/components/Icon.svelte'

	export let previous, next
	export let itemWidth = 18

	$: style = `style="--item-width: ${itemWidth};"`
</script>

<ul
	class="pagination gutter-wrapper narrow hide-overflow"
	{style}
>
	{#if previous}
		<li class="item previous">
			<slot name="previous">
				<a
					class="type-link-undecorated type-scale-gamma type-heading"
					href="{previous.link}"
				>
					<Icon
						svg="{arrowLeft}"
						margin="right"
					/>
					<span class="label">
						{previous.label || 'Previous'}
					</span>
				</a>
			</slot>
		</li>
	{/if}
	{#if next}
		<li class="item next">
			<slot name="next">
				<a
					class="type-link-undecorated type-scale-gamma type-heading"
					href="{next.link}"
				>
					<span class="label">
						{next.label || 'Next'}
					</span>
					<Icon
						svg="{arrowRight}"
						margin="left"
					/>
				</a>
			</slot>
		</li>
	{/if}
</ul>

<style>
	@supports (display: flex) {
	  .pagination {
	    display: flex;
	    justify-content: space-between;
	    flex-wrap: wrap;
	  }

	  .item {
	    flex: 0 1 var(--item-width);
	    display: flex;
	    flex-wrap: wrap;
	  }

	  .item.next {
	    margin-left: auto;
	    justify-content: flex-end;
	  }
	}

	.label {
		display: inline-block;
	}
</style>