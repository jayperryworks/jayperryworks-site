<script>
  import MainFooter from '@/components/MainFooter.svelte'

	export let segment
</script>

<style lang="scss" global>
  @use 'global';
  @use 'config/border';
  @use 'config/positioning';

  /* Sticky footer setup */
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  #sapper {
    @include border.add(
      left,
      $width: 'frame',
      $color: 'highlight',
      $style: solid
    );
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    z-index: positioning.z('low');
  }

  #main-wrapper {
    flex: 1 0 auto;
  }
</style>

<div id="main-wrapper">
  <slot></slot>
</div>
<MainFooter/>
