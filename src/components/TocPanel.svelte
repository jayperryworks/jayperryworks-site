<script>
	import arrowDotted from 'icons/arrow-dotted-right.svg'
	import Icon from '@/components/Icon.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let link, // url the panel should point to
		heading, // the title, e.g. "Blog"
		number // sequence number, e.g. 01

	// append additional classes as needed
	let classes = ''
	export { classes as class }
</script>

<style type="text/scss">
	article {
		min-height: 70vh;
	}
</style>

<article class="border-seam-top | padding-y-xwide padding-x-outside | {classes}">
	<Wrapper width="xwide">
    <header class="padding-bottom-xwide">
    	<p class="t-scale-gamma t-font-accent | c-fg-tertiary | padding-bottom-narrow">
    		{number}
    	</p>
    	<h2 class="padding-bottom t-scale-alpha">
        <a href={link}>{heading}</a>
      </h2>
      <a
      	class="t-link-undecorated margin-x padding-top-narrow position-relative"
      	href={link}
    	>
        <span class="c-fg-tertiary display-inline-block t-case-upper t-font-accent t-scale-eta t-weight-bold">
          See more
        </span>
        <span class="card-icon">
          <Icon
            svg={arrowDotted}
            size="xlarge"
            class="no-margin-top"
          />
        </span>
      </a>
    </header>
    <slot></slot>
  </Wrapper>
</article>
