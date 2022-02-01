<script context="module">
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

		// find the ID of this chapter
		const id = project.chapters[chapterNumber - 1]?.id;

		// use the current chapter ID to get the rest of this chapter's content
		const chapterResponse = await this.fetch(`${path}/${id}.json`);
		const chapter = await chapterResponse.json();

		// set up data for next/prev pagination nav
		let pagination = [];

		// if there's a previous chapter...
		if ((indexNumber - 1) >= 0) {
			pagination.push({
				label: project.chapters[indexNumber - 1]?.title,
				direction: 'previous',
				path: `${path}/${chapterNumber - 1}`
			})
		}

		// if there's a next chapter
		if (project.chapters[indexNumber + 1]) {
			pagination.push({
				label: project.chapters[indexNumber + 1]?.title,
				direction: 'next',
				path: `${path}/${chapterNumber + 1}`
			})
		}

		return {
			isCoverPage: (chapterNumber === 1),
			date: { year },
			project,
			chapter,
			pagination,
			slug
		};
	}
</script>

<script>
	import MainNav from '@/components/MainNav.svelte';
	import PostBody from '@/components/PostBody.svelte';
	import PaginationNav from '@/components/PaginationNav.svelte';

	import { format } from 'date-fns';

	export let isCoverPage, project, chapter, date, pagination;

	$:formattedDate = format(new Date(date.year, 0), 'yyyy');
</script>

<MainNav segment="writing" />
<main>
	{#if isCoverPage}
		<header>
			<h1>{project.title}</h1>
			{#if project.subtitle}
			<p>{project.subtitle}</p>
			{/if}
			<time datetime="{formattedDate}">{formattedDate}</time>
		</header>
	{:else}
		<header>
			{#if chapter.title}
				<h1 class="type-scale-beta">{chapter.title}</h1>
			{/if}
			{#if chapter.subtitle}
				<p>{chapter.subtitle}</p>
			{/if}
		</header>
	{/if}
	<PostBody blocks={chapter.body} />
	<PaginationNav items="{pagination}" />
</main>
