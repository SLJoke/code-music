<template>
  <nav-bar>
    <div slot="left" @click="goBack">back</div>
    <div slot="center">
      <span>{{detailName}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {NavBar},
  props: {
    detailName: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>