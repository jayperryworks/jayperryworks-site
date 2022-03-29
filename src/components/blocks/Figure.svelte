<script lang="ts">
	import Image from '../Image.svelte';

	export let sources: Array<{
			path: String;
			width: Number;
			height: Number;
		}>,
		alt: String,
		caption: String = '';
</script>

<figure class="type-align-center">
  <Image {sources} {alt}/>
</figure>
