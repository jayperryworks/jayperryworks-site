<script>
  import MainFooter from '@/components/MainFooter.svelte'

	export let segment
</script>

<style type="text/scss" global>
  // global/base styles
  @use 'global';

  // config for this layout
  @use 'config/border';
  @use 'config/positioning';

  // Sticky footer setup
  html {
    height: 100%; // for opera mini etc

    @supports (min-height: 100vh) {
      height: auto;
      min-height: 100vh;
    }
  }

  body {
    min-height: 100%;
    min-height: 100vh;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
    }
  }

  #sapper {
    @include border.add(
      left,
      $width: 'frame',
      $color: 'highlight',
      $style: solid
    );

    z-index: positioning.z('low');

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  #main-wrapper {
    position: relative;

    @supports (flex: 1) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
</style>

<div id="main-wrapper">
  <slot></slot>
</div>
<MainFooter />
