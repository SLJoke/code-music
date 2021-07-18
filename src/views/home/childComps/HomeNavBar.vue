<template>
  <nav-bar>
    <div slot="left">
      <div v-for="(item,index) in titles"
           :key="item"
           :class="{active: currentIndex === index}"
           @click="navClick(index)">
        <span>{{ item }}</span>
      </div>
    </div>
    <div slot="right" class="right" @click="goSearch">
      <img src="~assets/img/nav-bar-search.svg">
    </div>
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
    path: {
      type: Array,
      default() {
        return []
      }
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
    },
    goSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
.active span {
  color: #d32f32;
  padding-bottom: 6px;
  border-bottom: 2px solid #d32f32;
  font-size: 19px;
}

.right {
  margin-right: 10px;
}

.right img {
  width: 20px;
  height: 20px;
}
</style>