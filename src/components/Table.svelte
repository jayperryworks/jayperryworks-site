<script>
  export let headingColumns, rows
</script>

<table>
  {#each rows as row}
    {#if row.type == 'header'}
      <thead>
        <tr>
          {#each row.cells as cell}
            <th scope="col">{cell}</th>
          {/each}
        </tr>
      </thead>
    {:else if row.type == 'footer'}
      <tfoot>
        <tr>
          {#each row.cells as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      </tfoot>
    {:else}
      <tr>
        {#each row.cells as cell, index}
          {#if headingColumns.include(index)}
            <th scope="row">{cell}</th>
          {:else}
            <td>{cell}</td>
          {/if}
        {/each}
      </tr>
    {/if}
  {/each}
</table>
