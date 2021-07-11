<template>
  <nav-bar>
    <div slot="left">
      <div v-for="(item,index) in titles"
           :key="item"
           :class="{active: currentIndex == index}"
           @click="navClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
    <div slot="right">搜索</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "HomeNavBar",
  components: {NavBar},
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    path: Array,
    default() {
      return []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    navClick(index) {
      this.currentIndex = index
      this.$router.replace(this.path[index]).catch(err => err)
    }
  }
}
</script>

<style scoped>
.active span {
  height: 39px;
  color: #d32f32;
  border-bottom: 2px solid #d32f32;
  font-size: 19px;
}
</style>