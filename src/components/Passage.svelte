<script>
  export let html,
    lead = false

  let classes = ''
  export { classes as class }
</script>

<style type="text/scss">
  @use "config/border";
  @use "config/color";
  @use 'config/type';

  /* Lead paragraph with drop cap */
  .lead > :global(p:first-of-type) {
    &::first-letter {
      @include color.add-fg('primary');
      @include type.font-accent('bold');
      float: left;
      font-size: 3.5rem;
      line-height: 1.7rem;
      margin: 0.15em 0.1em 0 -0.03em;

      @supports (initial-letter: 2) or (-webkit-initial-letter: 2) {
        -webkit-initial-letter: 2;
        initial-letter: 2;
        float: none;
        margin: 0;
        margin-right: 0.1em;
      }
    }
  }

  .t-content {
    > * + * {
      margin-top: 1em;
    }

    // --- headings
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      :global(p) + &,
      :global(ul) + &,
      :global(ol) + & {
        margin-top: 1.5em;
      }

      & + :global(p),
      & + :global(ul),
      & + :global(ol) {
        margin-top: 0.5em;
      }
    }

    :global(p),
    :global(li) {
      line-height: type.leading();
    }

    // horizontal rules
    // -> created for footnotes
    > :global(hr) {
      margin: 1.2em 0;
      border: 0;
      height: 0;
      @include border.add('top');
    }

    // footnotes
    :global(.footnotes) {
      @include color.add-fg('tertiary');
      font-size: type.scale('zeta');
      margin-bottom: space();
      margin-top: space();
      padding-top: space();

      :global(li),
      :global(p) {
        @include color.add-fg('tertiary');
        @include type.font-accent;
        font-size: type.scale('zeta');
        letter-spacing: 0.02em;
      }
    }

    :global(.footnote) {
      @include border.add($style: 'secondary');
      @include border.radius;
      @include type.font-accent;
      background-color: transparent;
      border-color: inherit;
      color: inherit;
      display: inline-block;
      line-height: 1;
      margin-left: 0.25em;
      padding: 0.25em 1em;
    }
  }
</style>

<div class="t-content {classes}" class:lead>
  {@html html}
</div>
