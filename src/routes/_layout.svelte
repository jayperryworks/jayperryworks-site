<script>
	import Nav from '@/components/Nav.svelte'
  import MainFooter from '@/components/MainFooter.svelte'

	export let segment;
</script>

<style lang="scss" global>
  @use 'global';
  @use 'config/border';

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
    @include border.add(left, $width: 'frame', $color: 'highlight', $style: solid);
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  #main-wrapper {
    flex: 1 0 auto;
  }
</style>

<Nav {segment}/>
<main id="main-wrapper">
  <slot></slot>
</main>
<MainFooter/>
