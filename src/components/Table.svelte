<script>
  export let headingColumns, header, body, footer

  function alignClass(align) {
    return align ? `t-align-${align}@small` : ''
  }
</script>

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

<style>
  .wrapper {
    --min-width: 600px;

    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    overflow-x: scroll;
    padding-bottom: var(--space-narrow);

    @media screen and (min-width: 37.5em) {
      border: 0;
      padding: 0;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-family: var(--type-font-accent);
    font-size: var(--type-scale-zeta);
    min-width: var(--min-width);
    width: 100%;
  }

  thead {
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
    font-family: var(--type-font-accent);
    font-size: var(--type-scale-eta);
    font-weight: bold;
    text-align: left;
    text-transform: uppercase;
    vertical-align: bottom;
  }
  
  thead > th {
    padding-bottom: 0.5em;
  }

  /* alternating row colors */
  tr:nth-child(even) {
    background-color: var(--color-well);
  }

  td,
  th {
    padding: 0.5em 0.5em;
    position: relative;
    text-align: left;

  }
  
  td:last-child,
  th:last-child, {
    text-align: right;
  }

  th {
    font-family: var(--type-font-accent);
    font-weight: bold;
  }
</style>