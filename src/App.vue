<template>
  <div id="app">
    <keep-alive exclude="Profile">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-show="isShow"/>
    <player v-show="isPlay"/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"
import Player from "components/content/player/Player"

export default {
  name: 'App',
  components: {MainTabBar, Player},
  computed: {
    isShow() {
      if(this.$route.path === '/search') return false
      else if(this.$route.path.indexOf('/playlist/detail') !== -1) return false
      else return true
    },
    isPlay(){
      return this.$store.state.songId !== ''
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
