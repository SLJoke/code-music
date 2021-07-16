<template>
  <TabBar>
    <TabBarItem path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/music-circle.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/music-circle-active.svg">
      <span slot="item-text">音乐圈</span>
    </TabBarItem>
    <div class="music-note">
      <img v-if="isShow" src="~assets/img/tabbar/music-note.svg">
      <player v-else/>
    </div>
    <TabBarItem path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.svg">
      <span slot="item-text">我的</span>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar"
import TabBarItem from "../../common/tabbar/TabBarItem"
import Player from "../player/Player";

export default {
  name: "MainTabBar",
  components: {TabBar, TabBarItem, Player},
  computed: {
    isShow() {
      return this.$store.state.songId === ''
    }
  }
}
</script>

<style scoped>
.music-note {
  width: 80px;
  height: 80px;
  border-radius: 50%;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 -15px 20px -10px rgba(100, 100, 100, 0.11);
}

.music-note img {
  width: 40px;
  height: 40px;
}
</style>