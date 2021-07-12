<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-around;
  height: 44px;
  line-height: 44px;
  font-size: 16px;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.left,.center,.right {
  flex: auto;
  text-align: center;
}

.left div {
  display: flex;
  justify-content: space-around;
}
</style>