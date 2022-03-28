<script>
	import Image from '../Image.svelte';
	export let sources, alt, caption = '';
</script>

<figure class="type-align-center">
  <Image {sources} {alt}/>
</figure>
