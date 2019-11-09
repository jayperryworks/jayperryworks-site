<script>
  import ResponsiveImage from './ResponsiveImage.svelte'
  import Caption from './Caption.svelte'

  export let size, images, caption, credit
</script>

<style lang="scss">
  figure {
    margin: 0;
  }
</style>

<figure>
  <ul class="{size}">
    {#each images as image}
      <li>
        <ResponsiveImage
          sources={image.sources}
          alt={image.alt}
          border={image.border}
        />
      </li>
    {/each}
  </ul>
  {#if caption || credit}
    <Caption {caption} {credit} />
  {/if}
</figure>
