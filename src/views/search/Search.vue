<template>
  <div>
    <h2>search</h2>
    <button @click="goBack">back</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    goBack() {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style scoped>

</style>