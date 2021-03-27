<script>
  import MainFooter from '@/components/MainFooter.svelte'
  import { stores } from '@sapper/app'

  const { preloading } = stores()
</script>

<style global>
  /* Sticky footer setup */
  html {
    height: 100%; /* for opera mini etc */

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

  /* Animated 'spine' border */
  #spine-wrapper {
    --bg-color: 'highlight';
    --bg-size: 30px;
    --border-width: 0.5rem;

    padding-left: var(--border-width);
    position: relative;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  #spine-wrapper::before {
      background-color: var(--bg-color);
      bottom: 0;
      content: '';
      display: block;
      left: 0;
      position: fixed;
      top: 0;
      width: var(--border-width);
      z-index: 0;
    }
  }

  @keyframes stripes {
    from { background-position: 0 0; }
    to   { background-position: $bg-size $bg-size; }
  }

  @supports (background: repeating-linear-gradient(45deg, #fff, #000)) {
    #spine-wrapper.loading::before {
      /* cheers to https://css-tricks.com/uniqlo-stripe-hovers/ */
      animation: stripes 0.75s linear infinite;
      background: repeating-linear-gradient(
        -45deg,
        var(--bg-color),
        var(--bg-color) 25%,
        color.get($bg-color, $grade: 30) 25%,
        color.get($bg-color, $grade: 30) 50%,
        var(--bg-color) 50%
      ) top left fixed;
      background-size: $bg-size $bg-size;
    }
  }

  #main-wrapper {
    position: relative;
  }
  
  @supports (flex: 1) {
    #main-wrapper {
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
