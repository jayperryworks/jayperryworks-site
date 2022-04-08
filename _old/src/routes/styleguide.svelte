<script>
	import designTokens from '../../content/design-tokens.js'
	import arrowRight from 'icons/arrow-right.svg'
	import { titleize } from '@/utils/stringHelpers.js'
	import index from 'icons/index.svg'
	import Button from '@/components/Button.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import Wrapper from '@/components/Wrapper.svelte'
	
	const typeExamples = [
		{
			class: 'type-heading',
			title: 'Display font'
		},{
			class: 'type-font-accent',
			title: 'Accent font'
		},
		{
			class: '',
			title: 'Body font'
		},
	]
</script>


<MainNav />
<main>
	<section class="padding-x-outside padding-y-xwide">
		<Wrapper width="wide">
			<h1>Typography</h1>

			{#each typeExamples as example}
			<section class="border border-round margin-top-wide padding">
				<h2 class="type-font-accent type-weight-xlight type-scale-gamma color-fg-secondary">
					{example.title}
				</h2>
				<ol class="padding-top padding-y-flow">
					{#each Object.keys(designTokens.type.scale) as size}
						<li>
							<p class="type-scale-{size} {example.class}">Lorem ipsum dolor sit amet</p>
						</li>
					{/each}
				</ol>
			</section>
			{/each}

			<section class="border border-round margin-top-wide padding">
				<h2 class="type-font-accent type-weight-xlight type-scale-gamma color-fg-secondary padding-bottom">
					Body type sample
				</h2>
				<p>Lorem ipsum, dolor <strong>sit amet</strong>, consectetur adipisicing elit. Necessitatibus alias pariatur, <em>incidunt qui numquam</em> veniam quia nulla quo reprehenderit, ducimus fuga temporibus. Recusandae enim quo sit eos est illo quas!</p>
			</section>
		</Wrapper>
	</section>
	<section class="padding-x-outside padding-y-xwide border-seam-top">
		<Wrapper width="wide">
			<h1>Buttons</h1>

			{#each ['default', 'small'] as size}
				<section class="padding-top-wide">
					<h2 class="type-font-accent type-weight-xlight type-scale-gamma color-fg-secondary padding-bottom">
						{titleize(size)}
					</h2>
					<ul class="inline-list gutter-wrapper">
						<li class="gutter">
							<Button href="#" {size}>Lorem ipsum</Button>
						</li>
						<li class="gutter">
							<Button href="#" iconLeft="{index}" {size}>Lorem ipsum</Button>
						</li>
						<li class="gutter">
							<Button href="#" iconRight="{arrowRight}" {size}>Lorem ipsum</Button>
						</li>
					</ul>
				</section>
			{/each}
		</Wrapper>
	</section>

	<section>
		<Wrapper width="wide">
			
		</Wrapper>
	</section>
</main>

<style>
	.inline-list {
		list-style: none;
	}

	.inline-list > li {
		display: inline-block;
	}
</style>