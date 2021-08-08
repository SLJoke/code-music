<template>
  <div id="Fav">
    <nav-bar>
      <div slot="left" @click="goBack">back</div>
      <div slot="center">我的喜欢</div>
      <div slot="right" @click="clearFav">clear</div>
    </nav-bar>
    <div class="fav-content">
      <div v-if="hasFav">
        <div v-for="item in myFav" 
            :key="item.id"
            class="fav-item"
            @click="goToPlay(item.id)">
          <p>{{item.song}}</p>
          <p>{{item.singer}}</p>
        </div>
      </div>
      <div v-else class="empty">
        <div>收藏夹是空的</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import {mapState,mapMutations} from "vuex"

export default {
  name: 'Fav',
  components: {NavBar},
  computed: {
    ...mapState(['myFav']),
    hasFav() {
      if(this.myFav.length !== 0) return true
      else return false
    }
  },
  methods: {
    ...mapMutations(['updateSongId', 'clearMyFav']),
    goToPlay(id) {
      this.updateSongId(id)
    },
    goBack() {
      this.$router.go(-1)
    },
    clearFav() {
      this.clearMyFav()
    }
  }
}
</script>

<style scoped>
  .fav-content {
    margin-top: 44px;
  }
  
  .fav-item {
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid #d32f32;
  }

  .fav-item :last-child {
    margin-top: 2px;
    font-size: 13px;
    color: rgb(204, 204, 204);
  }

  .empty {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>