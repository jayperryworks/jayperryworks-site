<script>
	export let data

	let classes = ''
	export { classes as class }
</script>

<dl class="gutter-wrapper narrow {classes}">
  {#each data as stat}
  <div class="group gutter">
    <dt class="item label | color-fg-secondary">
      <span class="type-font-accent type-weight-light">{stat.label}</span>
    </dt>
    {#if Array.isArray(stat.value)}
    	{#each stat.value as valueItem}
		    <dd class="item series">
		      <span class="type-font-accent type-weight-light">{valueItem}</span>
		    </dd>
	    {/each}
    {:else}
    	<dd class="item">
	      <span class="type-font-accent type-weight-light">{stat.value}</span>
	    </dd>
    {/if}
  </div>
  {/each}
</dl>

<style>
	dl {
	  --min-width: 16rem;
	  --type-size: var(--type-scale-zeta);
	  list-style: none;
	  font-size: 0;
	}

	.group {
	  display: inline-block;
	  margin: 0;
	  width: var(--min-width);
	  vertical-align: top;
	}
	
	@media screen and (min-width: 30em) {
	  .group {
	    max-width: 100%;
	    min-width: var(--min-width);
	    width: calc((var(--min-width) - 100%) * 1000);
	  }
	}

	.item {
	  display: block;
	  margin-left: 0; /* reset dt/dd default indent */
	}

	.item > span {
		font-size: var(--type-size);
	}

	/* trick from https://codepen.io/ShadowShahriar/pen/LYyvVjo */
	.item.series {
		--separator: ',';
		display: inline;
		padding: 0;
		margin: 0;
	}

	.item.series::after {
		content: var(--separator) ' ';
		font-size: var(--type-size);
	}

	.item.series:last-of-type::after {
		content: '';
	}

	.label::after {
	  content: ':';
	}
</style>