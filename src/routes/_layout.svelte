<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style lang="scss">
  @import 'normalize-css/normalize.css';

  /* Base styles */
  @import 'base/body';
  @import 'base/icon';
  @import 'base/list';
  @import 'base/media';
  @import 'base/table';
  @import 'base/type';

  /* Utilities */
  @import 'utilities/border';
  @import 'utilities/color';
  @import 'utilities/layout_width';
  @import 'utilities/positioning';
  @import 'utilities/spacing';
  @import 'utilities/special_effects';
  @import 'utilities/visibility';
</style>

<Nav {segment}/>

<div class="border-frame">
	<slot></slot>
</div>
