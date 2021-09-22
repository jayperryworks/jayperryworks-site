<script>
	import Figure from '@/components/Figure.svelte';
	import Gallery from '@/components/Gallery.svelte';
	import ResponsiveImage from '@/components/ResponsiveImage.svelte';

	export let caption, credit, columnSize, gutter, images;
</script>

<Figure
	caption={caption}
	credit={credit}
>
  <Gallery size={columnSize} {gutter}>
    {#each images as item}
      <li class="type-align-center type-scale-zero">
        <ResponsiveImage
          sources={item.image}
          alt={item.alt}
          border={item.border}
        />
      </li>
    {/each}
  </Gallery>
</Figure>