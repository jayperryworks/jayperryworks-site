<script>
  export let headingColumns, header, body, footer

  function alignClass(align) {
    return align ? `t-align-${align}@small` : ''
  }
</script>

<style type="text/scss">
  @use 'config/border';
  @use 'config/breakpoints';
  @use 'config/color';
  @use 'config/scale';
  @use 'config/spacing';
  @use 'config/type';

  $min-width: 600px;
  $padding: 0.5em 0.5em;

  .wrapper {
    @include border.add($sides: top bottom);
    overflow-x: scroll;
    padding-bottom: spacing.get('narrow');

    @include breakpoints.query('>#{$min-width}') {
      border: 0;
      padding: 0;
    }
  }

  table {
    @include type.font-accent;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: type.scale('zeta');
    width: 100%;
    min-width: $min-width;
  }

  thead {
    @include border.add(
      $sides: "bottom",
      $width: 'thick',
      $style: 'solid',
      $color: 'primary'
    );
    @include color.add-fg('primary');
    @include type.font-accent('bold');
    font-size: type.scale('eta');
    text-align: left;
    text-transform: uppercase;
    vertical-align: bottom;

    th {
      padding-bottom: 0.5em;
    }
  }

  tr {
    &:nth-child(even) {
      background-color: color.get('well');
    }
  }

  td,
  th {
    padding: $padding;
    position: relative;
    text-align: left;

    &:last-child {
      text-align: right;
    }
  }

  th {
    @include type.font-accent('bold');
  }
</style>

<div class="wrapper">
  <table>
    {#if header && header.length > 0}
      <thead>
          <tr>
            {#each header as cell}
              <th
                scope="col"
                class={alignClass(cell.align)}
              >
                {cell.label}
              </th>
            {/each}
          </tr>
      </thead>
    {/if}

    <tbody>
      {#each body as row}
        <tr>
          {#each row as cell, index}
            {#if headingColumns.indexOf(index + 1) !== -1}
              <th
                class={alignClass(header[index].align)}
                scope="row"
              >
                {cell}
              </th>
            {:else}
              <td class={alignClass(header[index].align)}>
                {cell}
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>

    {#if footer && footer.length > 0}
      <tfoot>
        {#each footer as row}
          <tr>
            {#each row as cell, index}
                <td class=" t-font-accent t-weight-bold {alignClass(header[index].align)}">
                  {cell}
                </td>
            {/each}
          </tr>
        {/each}
      </tfoot>
    {/if}
  </table>
</div>
