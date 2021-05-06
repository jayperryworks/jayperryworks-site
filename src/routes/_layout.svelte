<script>
  import { stores } from '@sapper/app'
  import MainFooter from '@/components/MainFooter.svelte'

  const { preloading } = stores()
</script>

<div
  id="spine-wrapper"
  class:loading={$preloading}
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
    font-size: 100%;
    min-height: 100vh;
    box-sizing: border-box;
  }

  @media screen and (max-width: 30em) {
    html {
      font-size: 105%;
    }
  }

  @media screen and (max-width: 40em) {
    html {
      font-size: 110%;
    }
  }

  @media screen and (max-width: 40em) {
    html {
      font-size: 110%;
    }
  }

  @media screen and (max-width: 64em) {
    html {
      font-size: 120%;
    }
  }

  body {
    margin: 0;
    min-height: 100%;
    min-height: 100vh;
  }

  /* Animated 'spine' border */
  #spine-wrapper {
    --spine-color: hsl(223, 75%, 70%);
    --spine-color-shade: hsl(223, 75%, 80%);
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
        var(--spine-color-shade) 25%,
        var(--spine-color-shade) 50%,
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
    
    #sapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    #spine-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    #main-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  audio,
  canvas,
  img,
  video {
    vertical-align: middle;
    max-width: 100%;
  }
</style>
