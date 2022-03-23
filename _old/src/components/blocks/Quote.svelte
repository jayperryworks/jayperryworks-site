<script>
	import Passage from '../Passage.svelte';

	export let html;

	let classes = '';
	export { classes as class };
</script>

<blockquote class="padding-left type-style-italic {classes}">
	<Passage {html} typeSize="zeta" />
</blockquote>
