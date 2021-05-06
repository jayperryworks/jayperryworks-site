<script>
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'
  import scale from 'css/scale.js'

  export let sources,
    alt,
    ratioX = 3,
    ratioY = 1,
    useScale = true,
    cover = false,
    contain = false

  let classes = ''
  export { classes as class }

  $: ratio = {
    x: useScale ? scale.helpers.get(ratioX) : ratioX,
    y: useScale ? scale.helpers.get(ratioY) : ratioY
  }

  $: versions = sources.versions && sources.versions.length > 1
</script>

<div 
  class="aspect {classes}"
  style="--ratio-x: {ratio.x}; --ratio-y: {ratio.y};"
>
  <div class="content">
    {#if versions}
    	<ResponsivePicture
    		sources="{sources.versions}"
    		{alt}
    		{cover}
    		{contain}
    	/>
    {:else}
    	<ResponsiveImage
    		sources="{sources.versions[0].sizes || sources}"
    		{alt}
    		{cover}
    		{contain}
    	/>
    {/if}
  </div>
</div>

<style>
  .aspect {
    /* default at 1:1 - use JS above to calculate scale as needed */
    --ratio-x: 1;
    --ratio-y: 1;

    position: relative;
    width: 100%;
    padding-top: calc((var(--ratio-x) / var(--ratio-y)) * 100%);
  }

  .aspect::before {
    content: '';
    display: block;
  }

  .content {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

  }
  
  @supports (display: flex) {
    .content {
      display: flex;
    }
  }

  @supports (aspect-ratio: var(--ratio-x) / var(--ratio-y)) {
    .aspect {
      aspect-ratio: var(--ratio-x) / var(--ratio-y);
      padding-top: 0;
    }

    .aspect::before {
      content: none;
      display: none;
    }
  }
</style>