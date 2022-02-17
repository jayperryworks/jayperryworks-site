<script context="module">
	import { noCase } from 'change-case';

	function getPaginationLabel (direction, label, title = null) {
		if (title) {
			return `<span class="color-fg-secondary">${direction} ${noCase(label)}:</span> ${title}`
		}
		return `<span class="color-fg-secondary">${direction} ${noCase(label)}</span>`
	}

	export async function preload({ params }) {
		// get the post for this page using the date and slug params
		const { year, slug } = params;
		// the chapter number is a prop of the params object, but it's a string
		// -> convert it to a number before assigning (instead of destructuring as above) so we can do math with it below
		// -> otherwise, if chapterNumber = "1", chapterNumber + 1 = "11"
		const chapterNumber = parseInt(params.chapterNumber);
		// the chapters are numbered from 1, while the project.chapters array is numbered from 0.
		// -> store a reference to the index number in a new var to reduce confusion
		const indexNumber = chapterNumber - 1;

		// the absolute path to this longform project
		const path = `/longform/${year}/${slug}`;

		// query the whole project to get a list of chapters
		const projectResponse = await this.fetch(`${path}.json`);
		const project = await projectResponse.json();

		// add a path to each chapter in the project
		// -> for the nav links
		project.chapters.forEach((chapter, index) => {
			chapter.path = `${path}/${index + 1}`;
		})

		// find the ID of this chapter
		const id = project.chapters[chapterNumber - 1]?.id;

		// use the current chapter ID to get the rest of this chapter's content
		const chapterResponse = await this.fetch(`${path}/${id}.json`);
		const chapter = await chapterResponse.json();

		chapter.number = chapterNumber;
		chapter.path = `${path}/${chapterNumber}`;

		// set up data for next/prev pagination nav
		let pagination = [];

		// if there's a previous chapter...
		if ((indexNumber - 1) >= 0) {
			const prevChapter = project.chapters[indexNumber - 1];

			pagination.push({
				label: getPaginationLabel(
					'Previous',
					project.chapterLabel,
					prevChapter.displayTitle && prevChapter.title
				),
				direction: 'previous',
				path: `${path}/${chapterNumber - 1}`
			})
		}

		// if there's a next chapter
		if (project.chapters[indexNumber + 1]) {
			const nextChapter = project.chapters[indexNumber + 1];

			pagination.push({
				label: getPaginationLabel(
					'Next',
					project.chapterLabel,
					nextChapter.displayTitle && nextChapter.title
				),
				direction: 'next',
				path: `${path}/${chapterNumber + 1}`
			})
		}

		return {
			isCoverPage: (chapterNumber === 1),
			project,
			chapter,
			pagination,
			slug
		};
	}
</script>

<script>
	import LongformNav from '@/components/LongformNav.svelte';
	import PostBody from '@/components/PostBody.svelte';
	import PaginationNav from '@/components/PaginationNav.svelte';
	import Wrapper from '@/components/Wrapper.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import PageTheme from '@/components/PageTheme.svelte';

	export let isCoverPage, project, chapter, pagination;

	$: pageTitle = chapter.displayTitle ? `${project.title}: ${chapter.title}` : project.title;
</script>

<PageTitle title="{pageTitle}" />
<PageTheme {...chapter.theme} />

<LongformNav
	projectTitle="{project.title}"
	projectPath="{project.chapters[0].path}"
	currentPath="{chapter.path}"
	tableOfContents="{project.chapters}"
	showProjectTitle="{!isCoverPage}"
/>

<main>
	<article class="padding-x-outside padding-y-xwide">
		<header class="padding-bottom-xwide">
			<Wrapper
				width="wide"
				class="type-align-center"
			>
				{#if isCoverPage}
					<h1>{project.title}</h1>
					{#if project.subtitle}
						<p>{project.subtitle}</p>
					{/if}
				{:else}
					{#if chapter.title}
						<p class="subtitle | type-heading type-scale-delta type-font-accent type-weight-xlight | color-fg-secondary | padding-bottom-xnarrow">
							{project.chapterLabel} {chapter.number}
						</p>
						<h1 class="type-scale-beta">{chapter.title}</h1>
					{/if}
					{#if chapter.subtitle}
						<p class="subtitle | type-heading type-scale-gamma type-font-accent type-weight-xlight | color-fg-secondary | padding-top-xnarrow">{chapter.subtitle}</p>
					{/if}
				{/if}
			</Wrapper>
		</header>
		<PostBody blocks={chapter.body} />
	</article>
	<nav class="padding-bottom-xwide padding-x-outside">
		<PaginationNav items="{pagination}" />
	</nav>
</main>

<style>
	.subtitle {
		max-width: none;
	}
</style>
