<script>
	export let data
	export let gutter = 'narrow'
	export let size = 18

	let classes = ''
	export { classes as class }

	$: style = `
		--gutter: var(--space-${gutter});
		--col-size: ${size}rem;
	`
</script>

<dl
	class="{classes}"
	{style}
>
  {#each data as stat}
	  <div class="group">
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
	  --type-size: var(--type-scale-zeta);
	  list-style: none;
	  display: block;
	}


	.group {
	  display: block;
	  vertical-align: top;
	}

	.group + .group {
		margin-top: 1em;
		margin-top: var(--gutter);
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

	.item.series > span::after {
		white-space: nowrap;
		content: var(--separator) ' ';
		font-size: var(--type-size);
	}

	.item.series:last-of-type > span::after {
		content: '';
	}

	.label::after {
	  content: ':';
	}

	@supports (display: grid) {
		@media screen and (min-width: 25em) {
			dl {
			  display: grid;
			  grid-template-columns: repeat(auto-fit, minmax(var(--col-size), 1fr));
			  grid-gap: var(--gutter);
			}

		  .group + .group {
		    margin-top: 0;
		  }
		}
	}
</style>