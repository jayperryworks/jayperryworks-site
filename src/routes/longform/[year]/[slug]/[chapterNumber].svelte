<script context="module">
	import * as prismicHelpers from '@prismicio/helpers';

	function getPaginationLabel (direction, title = null) {
		if (title) {
			return `<span class="color-fg-secondary">${direction}:</span> ${title}`
		}
		return `<span class="color-fg-secondary">${direction}</span>`
	}

	function htmlSerializer (type, element, content, children) {
		 if (element.data?.label === 'note') {
			//  remove the parentheses and add a period so it reads as a sentence.
			const label = children.toString().replace('(', '').replace(')', '').concat('.');
			// capitalize the first letter
			label.charAt(0).toUpperCase();
			return `
				<button class="note">
					<svg class="note-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="2"><line x1="16" y1="8" x2="0" y2="8" stroke="currentColor"></line><line x1="8" y1="0" x2="8" y2="16" stroke="currentColor"></line></g></svg>
					<span class="note-flyout center">${label}</span>
				</button>
			`
		}

		return null
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

		if (chapter.testText) {
			chapter.testText = prismicHelpers.asHTML(chapter.testText, null, htmlSerializer);
		}

		return {
			project,
			chapter,
			slug
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import arrowRight from 'icons/arrow-right.svg'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte';
	import PageTheme from '@/components/PageTheme.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import PostBody from '@/components/PostBody.svelte';
	import SequenceNav from '@/components/SequenceNav.svelte';
	import SequenceNavStep from '@/components/SequenceNavStep.svelte';
	import Wrapper from '@/components/Wrapper.svelte';

	import Passage from '@/components/Passage.svelte';

	export let slug, project, chapter;

	let { title, subtitle, chapters, chapterLabel } = project;

	$: nextChapter = project.chapters[chapter.number];

	function timelineTooltipAlign (index) {
		if (index === 0) return 'start';
		if (index === chapters.length - 1) return 'end';
		return 'center';
	}

	// add click events to the tooltips the old fashioned way
	// -> because the Svelte runtime can't handle injected strings
	onMount(() => {
		const notes = document.querySelectorAll('.note')
		notes.forEach((note) => {
			note.addEventListener('click', (event) => {
				event.target.classList.toggle('show');
			});
		});
	});
</script>

<PageTitle title="{title}" />
<PageTheme {...chapter.theme} />

<MainNav segment="{slug}" theme="reverse" />

<main>
	<article class="padding-x-outside padding-y-xwide">
		<header class="padding-bottom-xwide">
			<Wrapper
				width="wide"
				class="type-align-center"
			>
				<h1>{title}</h1>
				{#if subtitle}
					<p>{subtitle}</p>
				{/if}

				<Wrapper class="padding-y-wide">
					<SequenceNav>
						{#each chapters as step, index}
							<SequenceNavStep
								label="{step.title}"
								path="{step.path}"
								current="{step.path === chapter.path}"
								complete="{step.complete}"
								tooltipAlign="{timelineTooltipAlign(index)}"
							/>
						{/each}
					</SequenceNav>
				</Wrapper>

				<p class="subtitle | type-heading type-scale-gamma type-font-accent type-weight-xlight | color-fg-secondary | padding-bottom-xnarrow">
					{chapterLabel} {chapter.number}
				</p>
				{#if chapter.title}
					<h1 class="type-scale-beta">{chapter.title}</h1>
				{/if}
				{#if chapter.subtitle}
					<p class="subtitle | type-heading type-scale-gamma type-font-accent type-weight-xlight | color-fg-secondary | padding-top-xnarrow">
						{chapter.subtitle}
					</p>
				{/if}
				<Passage class="padding-top-wide type-align-left" html="{chapter.testText}" />
			</Wrapper>
		</header>
		<PostBody blocks={chapter.body} />
	</article>
	<nav class="padding-bottom-xwide padding-x-outside">
		<Wrapper class="type-align-right">
			<SequenceNav>
				{#each chapters as step, index}
					<SequenceNavStep
						label="{step.title}"
						path="{step.path}"
						complete="{step.complete || step.path === chapter.path}"
						next="{step.path === nextChapter?.path}"
						tooltipAlign="{timelineTooltipAlign(index)}"
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
							{chapterLabel} {chapter.number + 1}
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

	:global(.note) {
		--size: 0.7em;
		background-color: var(--color-secondary);
		border-radius: 1000px;
		border: 0;
		color: var(--color-bg);
		cursor: pointer;
		display: inline-block;
		padding: 0.25em;
		position: relative;
		transition: background-color 0.25s ease;
		vertical-align: baseline;
		will-change: color;
	}

	:global(.note):hover,
	:global(.note.show) {
		background-color: var(--color-highlight);
	}

	:global(.note-icon) {
		display: block;
		height: var(--size);
		line-height: var(--size);
		max-height: 100%;
		max-width: 100%;
		pointer-events: none;
		width: var(--size);
	}

	:global(.note-flyout) {
		--bg: hsl(var(--color-bg-h), var(--color-bg-s), calc(var(--color-bg-l) + 15%));
		--border: var(--color-border);
		--pointer-margin: var(--space-xnarrow);
		--pointer-size: 0.6em;
		--show: 0;
		--transition-duration: 0.25s;

		background-color: var(--bg);
		border-radius: 0.25em;
		border: 1px solid var(--border);
		bottom: calc(var(--size) + var(--pointer-size) + 1em);
		box-shadow: 0 0.05rem 0.5rem var(--color-shadow);
		color: var(--color-primary);
		content: attr(title);
		display: block;
		font-family: var(--type-font-accent);
		font-size: var(--type-scale-zeta);
		line-height: var(--type-leading-tight);
		max-width: 18rem;
		min-width: 12rem;
		opacity: var(--show);
		padding: var(--space-xnarrow) var(--pointer-margin);
		position: absolute;
		transition: var(--transition-duration) opacity ease-in-out;
		will-change: opacity;
		z-index: 4;
	}

	:global(.note-flyout)::before,
	:global(.note-flyout)::after {
		border-left: var(--pointer-size) solid transparent;
		border-right: var(--pointer-size) solid transparent;
		content: '';
		display: inline-block;
		height: 0;
		position: absolute;
		width: 0;
	}

	:global(.note-flyout.start) {
		left: calc(var(--pointer-margin) * -1);
		text-align: left;
	}

	:global(.note-flyout.end) {
		right: calc(var(--pointer-margin) * -1);
		text-align: right;
	}

	:global(.note-flyout.center) {
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
	}

	:global(.note-flyout)::before {
		border-top: var(--pointer-size) solid var(--border);
		bottom: calc(var(--pointer-size) * -1);
	}

	:global(.note-flyout)::after {
		border-top: var(--pointer-size) solid var(--bg);
		bottom: calc((var(--pointer-size) - 0.1em) * -1);
	}

	:global(.note-flyout.start)::before,
	:global(.note-flyout.start)::after {
		left: var(--pointer-margin);
	}

	:global(.note-flyout.end)::before,
	:global(.note-flyout.end)::after {
		right: var(--pointer-margin);
	}

	:global(.note-flyout.center)::before,
	:global(.note-flyout.center)::after {
		left: 50%;
		transform: translateX(-50%);
	}

	:global(.note.center .note-flyout) {
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
	}

	:global(.note.show .note-flyout) {
		--show: 1;
	}
</style>
