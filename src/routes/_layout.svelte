<script>
  import { stores } from '@sapper/app'
  import color from 'css/color.js'
  import MainFooter from '@/components/MainFooter.svelte'

  const { preloading } = stores()
  const setColor = color.helpers.setCustomProperty
</script>

<div
  id="spine-wrapper"
  class:loading="{$preloading}"
>
  <div id="main-wrapper">
    <slot></slot>
  </div>
  <MainFooter />
</div>

<style global>
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    min-height: 100vh;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100%;
    min-height: 100vh;
  }

  img,
  picture,
  video {
    max-width: 100%;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  /* Animated 'spine' border */
  #spine-wrapper {
    --spine-color: hsl(
        var(--color-highlight-h),
        var(--color-highlight-s),
        var(--color-highlight-l)
    );
    --spine-color-tint: hsl(
      var(--color-highlight-h),
      var(--color-highlight-s), 
      calc(var(--color-highlight-l) + 10%)
    );
    --spine-stripe-size: 30px;
    --spine-width: 0.6rem;

    padding-left: var(--spine-width);
    position: relative;
  }

  #spine-wrapper::before {
    background-color: var(--spine-color);
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: fixed;
    top: 0;
    width: var(--spine-width);
    z-index: 0;
  }

  @keyframes stripes {
    from { background-position: 0 0; }
    to   { background-position: var(--spine-stripe-size) var(--spine-stripe-size); }
  }

  @supports (background: repeating-linear-gradient(45deg, #fff, #000)) {
    #spine-wrapper.loading::before {
      /* cheers to https://css-tricks.com/uniqlo-stripe-hovers/ */
      animation: stripes 0.75s linear infinite;
      background: repeating-linear-gradient(
        -45deg,
        var(--spine-color),
        var(--spine-color) 25%,
        var(--spine-color-tint) 25%,
        var(--spine-color-tint) 50%,
        var(--spine-color) 50%
      ) top left fixed;
      background-size: var(--spine-stripe-size) var(--spine-stripe-size);
    }
  }

  #main-wrapper {
    position: relative;
  }
  
  @supports (display: flex) {
    body {
      display: flex;
      flex-direction: column;
    }
    
    #sapper,
    #spine-wrapper,
    #main-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
</style>
