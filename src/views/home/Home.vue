<template>
  <div class="home">
    <home-nav-bar
        v-if="$route.meta.isShow"
        :titles="['推荐','榜单','歌单','艺人']"
        :path="['/home/recommend','/home/list','/home/songsheet','/home/artist']"
    />
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import HomeNavBar from "./childComps/HomeNavBar"

export default {
  name: "Home",
  components: {HomeNavBar}
}
</script>

<style scoped>

</style>