<script>
	import '../styles/utilities/specialEffects.css';
	import { onMount } from 'svelte';

	let message;

	onMount(() => {
		message.textContent = 'hello this is a test component';
	});
</script>

<p
	bind:this="{message}"
	class="shadow"
></p>
