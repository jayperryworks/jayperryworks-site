<script>
  export let label

  let classes = ''
  export {classes as class}
</script>

<details open class="{classes}">
  <summary aria-haspopup="menu">
    {label}
  </summary>
  <div class="
    dropdown
    margin-top
    padding-y
    t-align-left
  ">
    <slot></slot>
  </div>
</details>
