<template>
  <div id="app">
    <keep-alive exclude="Profile">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-if="$route.meta.isShow"/>
    <player v-if="isPlay"/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"
import Player from "components/content/player/Player"

export default {
  name: 'App',
  components: {MainTabBar, Player},
  computed: {
    isPlay(){
      return this.$store.state.songId !== ''
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
