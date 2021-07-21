<template>
  <div class="mainSlide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem"
}
</script>

<style scoped>
.mainSlide {
  width: 94%;
  margin: 3%;
  flex-shrink: 0;
}

.mainSlide img {
  width: 100%;
  border-radius: 10px;
}
</style>