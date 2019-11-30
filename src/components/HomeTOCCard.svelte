<script>
  export let link,
  rel="prefetch"

  let classes = ''
  export { classes as class }
</script>

<style type="text/scss">
  .card {
    display: inline-block;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  .content {
    @supports (flex: 1) {
      flex: 1;
    }
  }

  .footer {
    margin-top: auto;
    position: relative;
  }
</style>

<a
  href={link}
  rel={rel}
  class="
    card
    border border-round-bottom-right
    {classes}
  "
>
  <div class="content">
    <slot name="content"></slot>
  </div>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</a>
