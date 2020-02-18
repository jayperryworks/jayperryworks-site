<script context="module">
  export async function preload({ params, query }) {
    // just send straight to the first page in the paginated post lists
    return this.redirect(302, 'writing/page/1')
  }
</script>
