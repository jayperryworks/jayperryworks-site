<script lang="ts">
	import Image from '../Image.svelte';

	export let sources: Array<{
		path: string;
		width: number;
		height: number;
	}>;
	export let alt: string;
</script>

<figure class="type-align-center">
  <Image {sources} {alt}/>
</figure>
