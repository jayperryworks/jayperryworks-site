<script>
  import { stores } from '@sapper/app'
  import color from 'css/color.js'
  import MainFooter from '@/components/MainFooter.svelte'

  const { preloading } = stores()
</script>

<div
  id="spine-wrapper"
	class="border-spine overflow-hidden"
  class:loading="{$preloading}"
>
  <div id="main-wrapper">
    <slot></slot>
  </div>
  <MainFooter />
</div>

<style>
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
