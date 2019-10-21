<script>
  import ResponsiveImage from './ResponsiveImage.svelte'

  export let size
  export let images
  export let caption
  export let prominence
</script>

<style>
  figure {
    margin: 0;
  }

  .gallery {
    display: block;
    list-style: none;
    padding-left: 0;
  }

  .item {
    display: block;
  }
</style>

<figure>
  <ul class="gallery">
    {#each images as image}
      <li class="item">
        <ResponsiveImage sources={image.sources} alt={image.alt} />
      </li>
    {/each}
  </ul>
  {#if caption}
    <figcaption>{@html caption}</figcaption>
  {/if}
</figure>
