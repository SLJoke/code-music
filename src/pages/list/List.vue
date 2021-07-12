<template>
  <div class="list">
    <h2>榜单</h2>
  </div>
</template>

<script>
export default {
  name: "List"
}
</script>

<style scoped>
.list {
  overflow-y: scroll;

  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>