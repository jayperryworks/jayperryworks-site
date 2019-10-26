<script>
	import Nav from '@/components/Nav.svelte'
  import MainFooter from '@/components/MainFooter.svelte'

	export let segment;
</script>

<style lang="scss" global>
  /* Base styles */
  @import 'base/body.scss';
  @import 'base/icon.scss';
  @import 'base/list.scss';
  @import 'base/media.scss';
  @import 'base/table.scss';
  @import 'base/type.scss';

  /* Utilities */
  @import 'utilities/border.scss';
  @import 'utilities/color.scss';
  @import 'utilities/layout_width.scss';
  @import 'utilities/positioning.scss';
  @import 'utilities/spacing.scss';
  @import 'utilities/special_effects.scss';
  @import 'utilities/visibility.scss';

  /* Local styles */
  @import 'config/border.scss';

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
    @include border(left, $width: 'frame', $color: 'highlight', $style: solid);
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
