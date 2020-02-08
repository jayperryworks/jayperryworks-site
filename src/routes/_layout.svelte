<script>
  import MainFooter from '@/components/MainFooter.svelte'
  import { stores } from '@sapper/app'

  const { preloading, page } = stores()

  $: console.log($page.path)
</script>

<style type="text/scss" global>
  // global/base styles
  @use 'global';

  // config for this layout
  @use 'config/border';
  @use 'config/positioning';
  @use 'config/color';

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
    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  #spine-wrapper {
    $bg-color: 'highlight';
    $bg-size: 30px;

    padding-left: border.width('frame');
    position: relative;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &::before {
      background-color: color.get($bg-color);
      bottom: 0;
      content: '';
      display: block;
      left: 0;
      position: fixed;
      top: 0;
      width: border.width('frame');
      z-index: positioning.z('low');
    }

    &.loading::before {
      animation: barberpole 0.75s linear infinite;
      background: repeating-linear-gradient(
        -45deg,
        color.get($bg-color),
        color.get($bg-color) 25%,
        color.get($bg-color, $grade: 30) 25%,
        color.get($bg-color, $grade: 30) 50%,
        color.get($bg-color) 50%
      ) top left fixed;
      background-size: $bg-size $bg-size;
    }

    @keyframes barberpole {
      from { background-position: 0 0; }
      to   { background-position: $bg-size $bg-size; }
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

<div
  id="spine-wrapper"
  class:loading={$preloading}
>
  <div id="main-wrapper">
    <slot></slot>
  </div>
  <MainFooter />
</div>
