<script>
	import arrowRight from 'icons/arrow-right.svg'
	import Button from '@/components/Button.svelte'
	import DeviceFrame from '@/components/DeviceFrame.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import Wrapper from '@/components/Wrapper.svelte'
	import AspectRatio from '@/components/AspectRatio.svelte'

	let toc = [
		{
			images: [
				{
					source: '/images/GA_CourseProgress.jpg',
					device: 'tablet',
					orientation: 'landscape'
				}
			],
			title: 'Gateway Academy',
			subhead: 'A financial e-learning platform for Sub-Saharan East Africa',
			link: '#'
		},
		{
			images: [
				{
					source: '/images/tela-intro.jpg',
					alt: 'Tela home screen',
					device: 'phone',
					orientation: 'portrait'
				},
				{
					source: '/images/tela-intro.jpg',
					alt: 'Tela home screen',
					device: 'phone',
					orientation: 'portrait'
				},
				{
					source: '/images/tela-intro.jpg',
					alt: 'Tela home screen',
					device: 'phone',
					orientation: 'portrait'
				}
			],
			title: 'Tela',
			subhead: 'A financial e-learning platform for Sub-Saharan East Africa',
			link: '#'
		},
		{
			images: [
				{
					source: '/images/baldwin-poster.jpg'
				}
			],
			title: 'The Baldwin Prize',
			subhead: 'A financial e-learning platform for Sub-Saharan East Africa',
			link: '#'
		},
		{
			images: [
				{
					source: '/images/tela-intro.jpg',
					alt: 'Annual report cover on a phone',
					device: 'phone',
					orientation: 'portrait'
				},
				{
					source: '/images/book-mockup-spread.jpg',
					alt: 'Annual report spread',
					colspan: 5
				}
			],
			title: 'GPOBA branding',
			subhead: 'A financial e-learning platform for Sub-Saharan East Africa',
			link: '#'
		},
	]
</script>

<MainNav />

<header class="padding-x-outside padding-top-xwide">
	<h1>Design work</h1>
	<p class="padding-top">
		I have a broad background, a result of both curiosity and necessity. I like working with small teams, and I’ve often worn extra hats that the budget couldn’t fill. That suites me fine: I like hats, and I like to find patterns in complex processes. While user interface design and branding are my main focuses these days, I also have experience in publication design, print and environmental design, advertising, video and broadcast, and education.
	</p>
	<p>
		In addition to my design work, I’m a front-end coder. I love Javascript, HTML, and CSS. I advocate for semantics; inclusive accessibility; speed; and device-agnostic, responsive layouts. I tend to see my coding work as a natural extension of my design process. I like to “explore” with code via prototypes, and I love using styleguides and design systems to build consensus on complex projects.
	</p>
</header>

<section class="padding-x-outside padding-top-wide">
	<h2>Selected clients</h2>
	<p class="padding-top">
		I’m located in the Baltimore-DC metro area and, being near the U.S. government, I’ve ended up working frequently with nonprofits and NGOs. I’ve also worked with a number of startups, small businesses, and tech- and entertainment-industry folks. I’m very, very lucky to have had the chance to work with so many organizations I admire, and to contribute, in some small way, to their missions.
	</p>
	<p>
		Here’s a few clients I’ve worked with over the years, as part of various teams and agencies:
	</p>
	<ul>
		<li>Discovery Communications</li>
		<li>World Wildlife Fund</li>
		<li>Defenders of Wildlife</li>
		<li>World Bank Group</li>
	</ul>
</section>

<section class="padding-top-wide">
	<header class="padding-x-outside padding-bottom-wide">
		<h2>Case studies</h2>
		<p class="padding-top">Here’s a few of my favorite projects. I’m not able to publicly share some of my work due to copyright and confidentiality restrictions, but I can provide more work examples on request. Contact me if you’d like to talk.</p>
	</header>
	<ul class="case-studies">
		{#each toc as project}
			<li class="border-seam-top padding-x-outside padding-y-xwide">
				<Wrapper width="xwide">
					<article class="cover">
						<figure
							class="cover-figure"
							class:cover-gallery="{project.images.length > 1}"
						>
							{#each project.images as image}
								{#if image.device}
									<DeviceFrame
										image="{image.source}"
										alt="{image.alt || project.title}"
										type="{image.device}"
									/>
								{:else}
									<img src="{image.source}" alt="{image.alt || project.title}">
								{/if}
							{/each}
						</figure>
						<div class="cover-content">
							<h3>{project.title}</h3>
							<p class="type-subheading type-scale-delta padding-bottom">{project.subhead}</p>
							<Button
								iconRight="{arrowRight}"
								link="{project.link}"
							>
								Read more
							</Button>
						</div>
					</article>
				</Wrapper>
			</li>
		{/each}
		<li>
			<article class="border-seam-top padding-x-outside padding-y-xwide">
				<Wrapper width="xwide" class="cover">
					<figure class="cover-figure">
						<ul class="cover-gallery">
							<li class="device phone">
								<DeviceFrame
									image="/images/tela-intro.jpg"
									alt="Tela home screen"
									type="phone"
								/>
							</li>
							<li class="book spread">
								<img src="/images/book-mockup-spread.jpg" alt="GPOBA">
							</li>
						</ul>
					</figure>
					<div class="cover-content">
						<h3>GPOBA branding</h3>
						<p class="type-subheading type-scale-delta padding-bottom">A financial e-learning platform for Sub-Saharan East Africa</p>
						<Button
							iconRight="{arrowRight}"
							link="#"
						>
							Read more
						</Button>
					</div>
				</Wrapper>
			</article>
		</li>
	</ul>
</section>

<style>
	:global(.cover) {
		display: grid;
		grid-gap: var(--space-wide);
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.cover-figure {
		grid-column: span 2;
	}

	.cover-gallery {
		align-items: center;
		display: grid;
		grid-gap: var(--space-medium);
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		justify-content: center;
		list-style: none;
		padding-left: 0;
	}

	.cover-gallery > .device.phone + .book.spread {
		grid-column: span 5;
	}

	.case-studies {
		list-style: none;
		padding-left: 0;
	}
</style>