<script>
  import MainFooter from '@/components/MainFooter.svelte'
  import { stores } from '@sapper/app'

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
    --bg-color: hsl(223, 75%, 70%);
    --bg-color-shade: hsl(223, 75%, 80%);
    --bg-size: 30px;
    --border-width: 0.6rem;

    padding-left: var(--border-width);
    position: relative;
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

  @keyframes stripes {
    from { background-position: 0 0; }
    to   { background-position: var(--bg-size) var(--bg-size); }
  }

  @supports (background: repeating-linear-gradient(45deg, #fff, #000)) {
    #spine-wrapper.loading::before {
      /* cheers to https://css-tricks.com/uniqlo-stripe-hovers/ */
      animation: stripes 0.75s linear infinite;
      background: repeating-linear-gradient(
        -45deg,
        var(--bg-color),
        var(--bg-color) 25%,
        var(--bg-color-shade) 25%,
        var(--bg-color-shade) 50%,
        var(--bg-color) 50%
      ) top left fixed;
      background-size: var(--bg-size) var(--bg-size);
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
