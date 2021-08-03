<template>
  <div id="Fav">
    <nav-bar>
      <div slot="left" @click="goBack">back</div>
      <div slot="center">我的喜欢</div>
    </nav-bar>
    <div v-if="hasFav">
      <div v-for="item in myFav" :key="item.id">
        <p>{{item.song}}</p>
        <p>{{item.singer}}</p>
      </div>
    </div>
    <div v-else>
      <h2>收藏夹是空的</h2>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import {mapState} from "vuex"

export default {
  name: 'Fav',
  components: {NavBar},
  computed: {
    ...mapState(['myFav']),

    hasFav() {
      if(this.myFav !== []) return true
      else return false
    }
  },
  methods: {
    goBack() {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style scoped>

</style>