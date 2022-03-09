<script context="module">
	import { noCase } from 'change-case';

	function getPaginationLabel (direction, title = null) {
		if (title) {
			return `<span class="color-fg-secondary">${direction}:</span> ${title}`
		}
		return `<span class="color-fg-secondary">${direction}</span>`
	}

	export async function preload({ params }) {
		// get the post for this page using the date and slug params
		const { year, slug } = params;
		// the chapter number is a prop of the params object, but it's a string
		// -> convert it to a number before assigning (instead of destructuring as above) so we can do math with it below
		// -> otherwise, if chapterNumber = "1", chapterNumber + 1 = "11"
		const chapterNumber = parseInt(params.chapterNumber);

		// the absolute path to this longform project
		const path = `/longform/${year}/${slug}`;

		// query the whole project to get a list of chapters
		const projectResponse = await this.fetch(`${path}.json`);
		const project = await projectResponse.json();

		// add a path to each chapter in the project
		// -> for the nav links
		project.chapters.forEach((chapter, index) => {
			chapter.path = `${path}/${index + 1}`;
			chapter.complete = index < (chapterNumber - 1);
		})

		// find the ID of this chapter
		const id = project.chapters[chapterNumber - 1]?.id;

		// use the current chapter ID to get the rest of this chapter's content
		const chapterResponse = await this.fetch(`${path}/${id}.json`);
		const chapter = await chapterResponse.json();

		chapter.number = chapterNumber;
		chapter.path = `${path}/${chapterNumber}`;

		return {
			project,
			chapter,
			slug
		};
	}
</script>

<script>
	import arrowRight from 'icons/arrow-right.svg'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte';
	import PageTheme from '@/components/PageTheme.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import PostBody from '@/components/PostBody.svelte';
	import SequenceNav from '@/components/SequenceNav.svelte';
	import SequenceNavStep from '@/components/SequenceNavStep.svelte';
	import Wrapper from '@/components/Wrapper.svelte';

	export let slug, project, chapter;

	$: nextChapter = project.chapters[chapter.number];
</script>

<PageTitle title="{project.title}" />
<PageTheme {...chapter.theme} />

<MainNav segment="{slug}" theme="reverse" />

<main>
	<article class="padding-x-outside padding-y-xwide">
		<header class="padding-bottom-xwide">
			<Wrapper
				width="wide"
				class="type-align-center"
			>
				<h1>{project.title}</h1>
				{#if project.subtitle}
					<p>{project.subtitle}</p>
				{/if}

				<Wrapper class="padding-y-wide">
					<SequenceNav>
						{#each project.chapters as step, index}
							<SequenceNavStep
								label="{step.title}"
								path="{step.path}"
								current="{step.path === chapter.path}"
								complete="{step.complete}"
							/>
						{/each}
					</SequenceNav>
				</Wrapper>

				<p class="subtitle | type-heading type-scale-gamma type-font-accent type-weight-xlight | color-fg-secondary | padding-bottom-xnarrow">
					{project.chapterLabel} {chapter.number}
				</p>
				{#if chapter.title}
					<h1 class="type-scale-beta">{chapter.title}</h1>
				{/if}
				{#if chapter.subtitle}
					<p class="subtitle | type-heading type-scale-gamma type-font-accent type-weight-xlight | color-fg-secondary | padding-top-xnarrow">
						{chapter.subtitle}
					</p>
				{/if}
			</Wrapper>
		</header>
		<PostBody blocks={chapter.body} />
	</article>
	<nav class="padding-bottom-xwide padding-x-outside">
		<Wrapper class="type-align-right">
			<SequenceNav>
				{#each project.chapters as step}
					<SequenceNavStep
						label="{step.title}"
						path="{step.path}"
						complete="{step.complete || step.path === chapter.path}"
						next="{step.path === nextChapter?.path}"
					/>
				{/each}
			</SequenceNav>

			{#if nextChapter}
				<div class="next | padding-top-wide | type-scale-beta">
					<p>
						<a
							class="type-heading type-scale-gamma type-font-accent type-weight-xlight type-link-undecorated | color-fg-secondary | padding-bottom-xxnarrow"
							href="{nextChapter.path}"
						>
							{project.chapterLabel} {chapter.number + 1}
						</a>
						<a
							class="type-heading type-link-undecorated"
							href="{nextChapter.path}"
						>
							{nextChapter.title}
						</a>
					</p>
					<a
						class="next-icon | type-link-undecorated"
						href="{nextChapter.path}"
					>
						<Icon
							svg="{arrowRight}"
							size="small"
						/>
					</a>
				</div>
			{:else}
				<aside class="type-font-body type-style-italic type-scale-gamma type-align-center | padding-top-wide | color-fg-secondary">
					The end
				</aside>
			{/if}
		</Wrapper>
	</nav>
</main>

<style>
	.subtitle {
		max-width: none;
	}

	.next {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.next-icon {
		display: block;
		padding-left: 0.4em;
	}
</style>
