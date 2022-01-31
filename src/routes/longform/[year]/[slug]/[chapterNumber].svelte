<script context="module">
	export async function preload({ params }) {
		// get the post for this page using the date and slug params
		const { year, slug, chapterNumber } = params;
		const projectResponse = await this.fetch(`longform/${year}/${slug}.json`);
		const project = await projectResponse.json();

		const id = project.chapters[chapterNumber - 1]?.id;
		console.log(id);

		const chapterResponse = await this.fetch(`longform/${year}/${slug}/${id}.json`);
		const chapter = await chapterResponse.json();

		return {
			date: { year },
			project,
			chapter,
			slug
		};
	}
</script>

<script>
	import MainNav from '@/components/MainNav.svelte';
	import PaginationNav from '@/components/PaginationNav.svelte';

	import { format } from 'date-fns';

	export let project, chapter, date, slug;

	$:formattedDate = format(new Date(date.year, 0), 'yyyy');
</script>

<MainNav segment="writing" />
<main>
	<header>
		<time datetime="{formattedDate}">{formattedDate}</time>
		{#if chapter.title}
		<h1>{chapter.title}</h1>
		{/if}
		{#if chapter.subtitle}
			<p>{chapter.subtitle}</p>
		{/if}
	</header>
	<!-- <PaginationNav items="{[ prevPage, nextPage ]}" /> -->
</main>
