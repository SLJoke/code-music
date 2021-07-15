<template>
  <div class="sheet">
    <h2>歌单..</h2>
  </div>
</template>

<script>
export default {
  name: "SongSheet"
}
</script>

<style scoped>
.sheet {
  overflow-y: scroll;

  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>