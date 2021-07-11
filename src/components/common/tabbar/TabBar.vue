<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
.tab-bar {
  height: 60px;

  display: flex;
  align-items: center;
  font-size: 13px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  box-shadow: 0 -4px 12px rgba(100,100,100,0.1);
}
</style>