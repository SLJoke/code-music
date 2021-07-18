<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem"
}
</script>

<style scoped>
.slide {
  width: 94%;
  margin: 3%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
  border-radius: 10px;
}
</style>