<script>
  import MainFooter from '@/components/MainFooter.svelte'

	export let segment
</script>

<style type="text/scss" global>
  @use 'global';
  @use 'config/border';
  @use 'config/positioning';

  // Sticky footer setup
  html,
  body {
    height: 100%;
  }

  body {
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
<MainFooter/>
