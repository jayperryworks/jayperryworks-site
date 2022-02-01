<script context="module">
	export async function preload({ params }) {
		// get the post for this page using the date and slug params
		const { year, slug } = params;
		// the chapter number is a prop of the params object, but it's a string
		// -> convert it to a number before assigning (instead of destructuring as above) so we can do math with it below
		// -> otherwise, if chapterNumber = "1", chapterNumber + 1 = "11"
		const chapterNumber = parseInt(params.chapterNumber);

		// the absolute path to this longform project
		const path = `/longform/${year}/${slug}`;

		const projectResponse = await this.fetch(`${path}.json`);
		const project = await projectResponse.json();

		const id = project.chapters[chapterNumber - 1]?.id;

		const chapterResponse = await this.fetch(`${path}/${id}.json`);
		const chapter = await chapterResponse.json();

		console.log(chapterNumber)

		let pagination = [];

		if ((chapterNumber - 2) >= 0) {
			pagination.push({
				title: project.chapters[chapterNumber - 2]?.title || 'Continue',
				direction: 'previous',
				path: `${path}/${chapterNumber - 1}`
			})
		}

		if (project.chapters[chapterNumber]) {
			pagination.push({
				title: project.chapters[chapterNumber]?.title || 'Continue',
				direction: 'next',
				path: `${path}/${chapterNumber + 1}`
			})
		}

		return {
			isCoverPage: (parseInt(chapterNumber) === 1),
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
