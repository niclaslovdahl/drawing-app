<script>
  export let changeColor;
</script>

<input
  on:change={e => changeColor(e)}
  type="color"
  name="favcolor"
  value="#FFFFFF" />
