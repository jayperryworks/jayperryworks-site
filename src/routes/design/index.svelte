<script>
	import arrowRight from 'icons/arrow-right.svg'
	import Button from '@/components/Button.svelte'
	import DeviceFrame from '@/components/DeviceFrame.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import Wrapper from '@/components/Wrapper.svelte'
	import AspectRatio from '@/components/AspectRatio.svelte'
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
		<li>
			<article class="border-seam-top padding-x-outside padding-y-xwide">
				<Wrapper width="xwide">
					<DeviceFrame
						class="margin-bottom"
						image="/images/GA_CourseProgress.jpg"
						alt="Gateway Academy"
					/>
					<h3>Gateway Academy</h3>
					<p class="type-subheading type-scale-delta padding-bottom">A financial e-learning platform for Sub-Saharan East Africa</p>
					<Button
						iconRight="{arrowRight}"
						link="#"
					>
						Read more
					</Button>
				</Wrapper>
			</article>
		</li>
		<li>
			<article class="border-seam-top padding-x-outside padding-y-xwide">
				<Wrapper width="xwide">
					<div class="device-gallery padding-bottom">
						<DeviceFrame
							image="/images/tela-intro.jpg"
							alt="Tela home screen"
							type="phone"
						/>
						<DeviceFrame
							image="/images/tela-intro.jpg"
							alt="Tela home screen"
							type="phone"
						/>
						<DeviceFrame
							image="/images/tela-intro.jpg"
							alt="Tela home screen"
							type="phone"
						/>
					</div>
					<h3>Gateway Academy</h3>
					<p class="type-subheading type-scale-delta padding-bottom">A financial e-learning platform for Sub-Saharan East Africa</p>
					<Button
						iconRight="{arrowRight}"
						link="#"
					>
						Read more
					</Button>
				</Wrapper>
			</article>
		</li>
		<li>
			<article class="border-seam-top padding-x-outside padding-y-xwide">
				<Wrapper width="xwide">
					<figure class="padding-bottom">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
							<defs>
								<style>
									svg {
										/*background-image: url('/images/baldwin-mockup.jpg');*/
										background-size: contain;
										background-position: top left;
										background-repeat: no-repeat;
										overflow: hidden;
									}

									image, circle {
										/*opacity: 0.6;*/
									}
									circle {
										fill: var(--color-bg);
									}
								</style>
								<clipPath id="zoom-top">
									<circle
										r="100"
										cx="393"
										cy="140"
									/>
								</clipPath>
								<clipPath id="zoom-bottom">
									<circle
										r="72"
										cx="375"
										cy="360"
									/>
								</clipPath>
								<filter id="shadow">
						      <feDropShadow
						      	dx="0"
						      	dy="2"
						      	stdDeviation="3"
					         	style="flood-color: var(--color-shadow);"
				         	/>
						    </filter>
							</defs>
							<image
								href="/images/baldwin-poster.jpg"
								width="334"
								height="500"
								x="0"
								y="0"
							/>
							<circle
								r="103"
								cx="393"
								cy="140"
								fill="currentColor"
								id="zoom-top-border"
								style="fill: var(--color-border); filter: url('#shadow');"
							/>
							<image
								href="/images/baldwin-poster.jpg"
								width="891"
								height="1333"
								x="-150"
								y="-300"
								clip-path="url('#zoom-top')"
							/>
							<circle
								r="75"
								cx="375"
								cy="360"
								fill="currentColor"
								id="zoom-top-border"
								style="fill: var(--color-border); filter: url('#shadow');"
							/>
							<image
								href="/images/baldwin-poster.jpg"
								width="700"
								height="1047"
								x="-60"
								y="-380"
								clip-path="url('#zoom-bottom')"
							/>
						</svg>
					</figure>
					<h3>The Baldwin Prize</h3>
					<p class="type-subheading type-scale-delta padding-bottom">A financial e-learning platform for Sub-Saharan East Africa</p>
					<Button
						iconRight="{arrowRight}"
						link="#"
					>
						Read more
					</Button>
				</Wrapper>
			</article>
		</li>
	</ul>
</section>

<style>
	.device-gallery {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: var(--space-medium);
	}

	.case-studies {
		list-style: none;
		padding-left: 0;
	}
</style>