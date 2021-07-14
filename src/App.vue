<template>
  <div id="app">
    <keep-alive exclude="Profile">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-if="isShow"/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"

export default {
  name: 'App',
  components: {MainTabBar},
  computed: {
    isShow() {
      return this.$route.path != '/musicplayer'
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
