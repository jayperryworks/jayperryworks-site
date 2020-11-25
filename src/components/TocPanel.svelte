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
		min-height: 80vh;
	}

	.action-label,
	.action-icon {
		vertical-align: middle;
		display: inline-block;
	}

	.action-label {
		margin-top: -1em;
	}
</style>

<article class="border-seam-top | padding-y-xwide padding-x-outside | display-flex display-flex-column | {classes}">
	<header class="padding-bottom-wide">
		<Wrapper width="xwide">
			<p class="t-scale-gamma t-font-accent | c-fg-tertiary | padding-bottom-narrow">
				{number}
			</p>
			<h2 class="padding-bottom-wide | t-scale-alpha">
				<a href={link}>{heading}</a>
			</h2>
			<a
				class="t-link-undecorated | display-inline-block"
				href={link}
			>
				<span class="action-label | t-case-upper t-font-accent t-scale-eta t-weight-bold">
					See more
				</span>
				<span class="action-icon | margin-left-xnarrow">
					<Icon
						svg={arrowDotted}
						size="xlarge"
						class="no-margin-top"
					/>
				</span>
			</a>
		</Wrapper>
	</header>
	<slot></slot>
</article>
