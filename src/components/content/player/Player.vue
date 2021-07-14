<template>
  <audio :src="url" :autoplay="autoplay" :controls="ctrl"></audio>
</template>

<script>
export default {
  name: "Player",
  props: {
    url: {
      type: String,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    ctrl: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>