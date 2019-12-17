<script>
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'

  export let sources,
    alt,
    ratio = '3x1',
    cover = false,
    contain = false

  let classes = ''
  export { classes as class }
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

  // force an inline child image to conform to the aspect ratio of the aspect-content container
  .content > :global(img) {
    // display: inline-block;
    // line-height: 100%;
    // margin: 0;
    // max-height: 100%;
    // max-width: 100%;
    // vertical-align: middle;
  }

  // --- variations ---
  @include _aspect-variation();
</style>

<div class="aspect ratio-{ratio} {classes}">
  <div class="content">
    <ResponsiveImage {sources} {alt} {cover} {contain} />
  </div>
</div>
