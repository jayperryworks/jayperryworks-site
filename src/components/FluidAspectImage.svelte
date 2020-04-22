<script>
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'

  export let sources,
    alt,
    ratio = '3x1',
    cover = false,
    contain = false

  let classes = ''
  export { classes as class }

  $: versions = sources.versions && sources.versions.length > 1
</script>

<style type="text/scss">
  @use 'config/scale';

  @mixin _aspect-variation($w: 3, $h: 1, $use-scale: true) {
    .ratio-#{$w}x#{$h} {
      &::before {
        @if $use-scale {
          padding-top: (scale.get($h) / scale.get($w) * 100%);
        } @else {
          padding-top: ($h / $w * 100%);
        }
      }
    }
  }

  .aspect {
    position: relative;
    width: 100%;

    &::before {
      content: '';
      display: block;
    }
  }

  // --- elements ---
  .content {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    @supports (display: flex) {
      display: flex;
    }
  }

  // --- variations ---
  @include _aspect-variation();
</style>

<div class="aspect ratio-{ratio} {classes}">
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
