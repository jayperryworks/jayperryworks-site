<script>
  import Icon from './Icon.svelte'

  export let url,
    role = '',
    size = '',
    iconLeft = '',
    iconRight = ''

  let classes = ''
  export { classes as class }
</script>

<style lang="scss">
  @use "config/border";
  @use "config/color";
  @use "config/type";
  @use "config/animation";

  $padding-x: 1.2em;
  $padding-y: 0.5em;

  @mixin padding-with-icon(
    $y: 0.5em,
    $x: 1.2em,
    $icon-offset: 0.3em
  ) {
    padding: $y $x;

    &.has-icon-left {
      padding-left: ($x + 1em);
    }

    &.has-icon-right {
      padding-right: ($x + 1em);
    }

    :global(.icon) {
      position: absolute;
      top: 50%;
      transform: translateY(-30%);
    }

    :global(.icon.left) {
      left: ($x - $icon-offset);
    }

    :global(.icon.right) {
      right: ($x - $icon-offset);
    }
  }

  .button {
    $color: 'primary';

    @include padding-with-icon();
    @include border.add('all', $style: solid, $color: $color);
    @include color.add-fg($color);
    @include type.font-accent();
    @include animation.transition();
    background-color: transparent;
    border-radius: 0.2em;
    display: inline-block;
    font-size: type.scale('zeta');
    position: relative;

    &:hover,
    &:active {
      @include color.add-bg('island');
      @include color.add-fg($color, $shade: 'light');
    }

    :global(sup) {
      font-size: 0.6em;
    }

    :global(strong) {
      @include type.font-accent('bold');
    }
  }

  /* --- sizes --- */
  .xsmall {
    @include padding-with-icon(0.2em, 0.6em, $icon-offset: 0);
    font-size: type.scale('eta');
  }

  .small {
    @include padding-with-icon(0.3em, 0.8em, $icon-offset: 0.13em);
    border-width: border.width('mid');
    font-size: type.scale('zeta');
  }

  .large {
    @include padding-with-icon(0.6em, 1.4em);
    font-size: type.scale('epsilon');
  }

  /* --- role --- */
  .primary {
    @include color.add('border-color', 'primary');
    @include color.add-bg('primary');
    @include color.add-fg('bg');

    &:hover {
      @include color.add(border-color, 'primary', $shade: 'light');
      @include color.add-fg('bg');
      @include color.add-bg('primary', $shade: 'light');
    }

    &:active {
      @include color.add(border-color, 'primary', $shade: 'dark');
      @include color.add-fg('bg');
      @include color.add-bg('primary', $shade: 'dark');
    }
  }
</style>

<a
  href={url}
  class="button {role} {size} {classes}"
  class:has-icon-left={iconLeft}
  class:has-icon-right={iconRight}
>
  {#if iconLeft}
    <Icon
      svg={iconLeft}
      size="small"
      class="icon left"
    />
  {/if}

  <slot></slot>

  {#if iconRight}
    <Icon
      svg={iconRight}
      size="small"
      class="icon right"
    />
  {/if}
</a>
