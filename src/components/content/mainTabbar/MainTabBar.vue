<template>
  <TabBar>
    <TabBarItem path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/music-circle.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/music-circle-active.svg">
      <span slot="item-text">音乐圈</span>
    </TabBarItem>
    <div class="music-note"></div>
<!--    <img src="~assets/img/tabbar/music-note.svg">-->
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

export default {
  name: "MainTabBar",
  components: {TabBar, TabBarItem}
}
</script>

<style scoped>
.music-note {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url("~assets/img/tabbar/music-note.svg");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  background-color: #ffffff;

  box-shadow: 0 -15px 20px -10px rgba(100,100,100,0.11);
}
</style>