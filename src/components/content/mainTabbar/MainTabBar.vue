<template>
  <TabBar>
    <TabBarItem path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/music-circle.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/music-circle-active.svg">
      <span slot="item-text">音乐圈</span>
    </TabBarItem>
    <TabBarItem path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/about.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/about-active.svg">
      <span slot="item-text">关于</span>
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

</style>