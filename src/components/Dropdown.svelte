<script>
  export let label

  let classes = ''
  export {classes as class}

  let open = false
</script>

<style type="text/scss">
  @use 'config/border';
  @use 'config/color';
  @use 'config/positioning';
  @use 'config/special_effects';
  @use 'config/spacing';

  details {
    display: inline-block;
    position: relative;
  }

  summary {
    cursor: pointer;
    list-style: none;

    // remove marker added by chrome
    &::-webkit-details-marker {
      display: none;
    }

    details[open] & {
      // add an invisible overlay to whole screen so you can click anywhere else to dismiss the dropdown
      // -> cheers to https://github.com/muan/details-on-details
      // -> https://github.com/github/details-menu-element
      &::before {
        cursor: default;
        content: ' ';
        display: block;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: positioning.z('high');
        background: transparent;
      }
    }
  }

  .dropdown {
    display: block;
    min-width: 10rem;
    z-index: positioning.z('top');
  }

  details[open] .dropdown {
    $pointer-size: 0.48rem;

    @include border.add($style: solid);
    @include border.radius();
    @include special_effects.shadow();
    position: absolute;
    right: 0;

    &::before,
    &::after {
      border-width: 0 #{$pointer-size} #{$pointer-size};
      content: ' ';
      display: block;
      position: absolute;
      right: spacing.get('narrow');
      border-style: solid;
      height: 0;
      width: 0;
    }

    &::before {
      border-color: transparent transparent #{color.get('border')};
      border-color: transparent transparent #{color.custom-prop('border')};
      top: ($pointer-size * -1);
    }

    &::after {
      border-color: transparent transparent #{color.get('bg')};
      border-color: transparent transparent #{color.custom-prop('bg')};
      top: (($pointer-size - 0.065rem) * -1); // 0.65rem = approx. 1px
    }
  }
</style>

<details {open} class="{classes}">
  <summary
    class=""
    aria-haspopup="menu"
  >
    <slot name="label"></slot>
  </summary>
  <div
    class="dropdown margin-top padding-y t-align-left"
    data-theme="default"
  >
    <slot name="dropdown"></slot>
  </div>
</details>
