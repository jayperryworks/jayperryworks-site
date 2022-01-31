<script context="module">
	export async function preload({ params }) {
		// get the post for this page using the date and slug params
		const { year, slug, chapterNumber } = params;
		const projectResponse = await this.fetch(`longform/${year}/${slug}.json`);
		const project = await projectResponse.json();

		const id = project.chapters[chapterNumber - 1]?.id;

		const chapterResponse = await this.fetch(`longform/${year}/${slug}/${id}.json`);
		const chapter = await chapterResponse.json();

		return {
			isCoverPage: (chapterNumber == 1),
			date: { year },
			project,
			chapter,
			pagination: [
				// previous chapter
				project.chapters[chapterNumber- 2],
				// next chapter
				project.chapters[chapterNumber]
			],
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
	console.log(isCoverPage)

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
