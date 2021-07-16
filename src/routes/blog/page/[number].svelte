<script context="module">
	export async function preload({ params, query }) {
		const { number } = params
		const response = await this.fetch(`blog/page/${number}.json`)
		const data = await response.json()

		return {
			number,
			total: data.totalPages,
			posts: data.posts
		}
	}
</script>

<script>
	import { format } from 'date-fns'
	import arrowLeft from 'icons/arrow-left.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import arrowSmallRight from 'icons/arrow-right.svg'
	import BlockList from '@/components/BlockList.svelte'
	import Bookend from '@/components/Bookend.svelte'
	import Button from '@/components/Button.svelte'
	import Figure from '@/components/Figure.svelte'
	import Icon from '@/components/Icon.svelte'
	import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let posts, number, total

	const currentDate = format(new Date(), 'yyyy')

	$: nextPage = parseInt(number) + 1
	$: prevPage = parseInt(number) - 1

	$: postsByYear = posts.reduce((result, post) => {
		if (!Object.keys(result).includes(post.date.year)) {
			result[post.date.year] = posts.filter(p => p.date.year === post.date.year)
		}
		return result
	}, {})

	function date(date, template = 'MMMM d, yyyy') {
		return format(new Date(date.year, date.month, date.day), template)
	}
</script>

{#each Object.keys(postsByYear).reverse() as year, index}
	<section class:border-seam-top="{index > 0}">
		<div class="flag padding-x-outside padding-y-xwide">
			<h1 class="padding-bottom-wide">
				{year}
			</h1>

			<!-- posts -->
			<Wrapper centered="{false}">
				<ul class="post-list margin-y-flow-xwide padding-y-flow-xwide | border-y-flow | type-leading-default">
					{#each postsByYear[year] as post}
						<li>
							<article>
								<a
									rel="prefetch"
									href="{post.path}"
									class="t-link-undecorated"
								>
									{#if post.cover && post.cover.image}
										<div class="padding-bottom">
											<Figure
												sources="{post.cover.image}"
												alt="{post.cover.alt}"
												caption="{post.cover.caption}"
												credit="{post.cover.credit}"
												border="{post.cover.border}"
											/>
										</div>
									{/if}
									<h2>{post.title}</h2>
									{#if post.subtitle}
										<p class="color-fg-secondary type-font-accent type-scale-gamma type-weight-xlight type-leading-tight">
											{post.subtitle}
										</p>
									{/if}
								</a>
								<time
									class="post-date color-fg-secondary padding-bottom type-font-accent type-scale-epsilon type-weight-xlight"
									datetime="{date(post.date, 'yyyy-M-dd')}"
								>
									{date(post.date)}
								</time>
								<BlockList blocks="{post.excerpt}" dropCap="{false}" />
								{#if post.readMore}
									<Button
										href="{post.path}"
										iconRight="{arrowSmallRight}"
										size="small"
										class="margin-top"
									>
										Read more
									</Button>
								{/if}
							</article>
						</li>
					{/each}
				</ul>
			</Wrapper>
		</div>
	</section>
{/each}
<footer class="border-seam-top padding-x-outside padding-y-wide">
	<div
		class="pagination gutter-wrapper"
		class:right-only="{prevPage === 0}"
	>
		{#if prevPage > 0}
			<div class="gutter">
				<a
					class="type-link-undecorated type-scale-gamma type-heading"
					href="{`blog/page/${prevPage}`}"
				>
					<Icon
						svg="{arrowLeft}"
						margin="right"
					/>
					<span class="pagination-label">
						Newer posts
					</span>
				</a>
			</div>
		{/if}
		{#if nextPage <= total}
			<div class="gutter">
				<a
					class="type-link-undecorated type-scale-gamma type-heading"
					href="{`blog/page/${nextPage}`}"
				>
					<span class="pagination-label">
						Older posts
					</span>
					<Icon
						svg="{arrowRight}"
						margin="left"
					/>
				</a>
			</div>
		{/if}
	</div>
</footer>

<style>
	@media screen and (min-width: 70em) {
		@supports (display: grid) {
			.flag {
				display: grid;
				grid-template-columns: minmax(auto, 30vw) minmax(30rem, 1fr);
				grid-gap: var(--space-wide);
			}
		}
	}

	.post-date {
		display: block;
	}

	.post-list {
		list-style: none;
		padding-left: 0;
		margin: 0 0 1em 0;
	}

	@supports (display: flex) {
		.pagination {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			text-align: center;
		}

		.pagination.right-only {
			justify-content: flex-end;
		}
	}

	.pagination-label {
		display: inline-block;
	}
</style>