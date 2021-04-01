<script>
  let classes = ''
  export {classes as class}

  let open = false
</script>

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

<style>
  details {
    display: inline-block;
    position: relative;
  }

  summary {
    cursor: pointer;
    list-style: none;
  }
  
  // remove marker added by webkit
  summary::details-marker {
    display: none;
  }
  
  /* 
    add an invisible overlay to whole screen so you can click anywhere else to dismiss the dropdown
    -> cheers to https://github.com/muan/details-on-details
    -> https://github.com/github/details-menu-element
  */
  details[open] summary::before {
    cursor: default;
    content: ' ';
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3
    background: transparent;
  }

  .dropdown {
    --pointer-size: 0.48rem;
    --border-width: 1px;

    display: block;
    min-width: 10rem;
    z-index: 4;
  }

  details[open] .dropdown {
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--color-border);
    box-shadow: 0 0 0.5rem var(--color-shadow);
    position: absolute;
    right: 0;
  }
  
  @supports (border-width: 0 var(--pointer-size) var(--pointer-size)) {
    details[open] .dropdown::before,
    details[open] .dropdown::after {
      border-width: 0 var(--pointer-size) var(--pointer-size);
      content: ' ';
      display: block;
      position: absolute;
      right: var(--space-narrow);
      border-style: solid;
      height: 0;
      width: 0;
    }

    details[open] .dropdown::before {
      border-color: transparent transparent var(--color-border);
      top: calc(var(--pointer-size) * -1);
    }

    details[open] .dropdown::after {
      border-color: transparent transparent var(--color-bg);
      top: calc((var(--pointer-size) - var(--border-width)) * -1);
    }
  }
</style>
