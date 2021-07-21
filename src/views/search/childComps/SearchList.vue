<template>
  <div class="search-list">
    <div
        class="search-item"
        v-for="item in searchData"
        :key="item.id"
        @click="searchSongId(item.id)"
    >
      <img v-lazy="item.al.picUrl + '?param=50y50'" @load="refresh">
      <div>
        <span class="song">{{item.name}}</span>
        <span class="singer">---{{item.ar[0].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  name: "SearchList",
  props: {
    searchData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    ...mapMutations(['updateSongId']),
    searchSongId(id) {
      this.updateSongId(id)
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.search-list {
  width: 100%;
}

.search-item {
  height: 60px;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, .15);
  margin: 5%;
  /* background-color: rgba(0, 0, 0, .05); */
}

.search-item img {
  width: 50px;
  height: 50px;
}

.search-item div {
  margin: 5px 0 0 10px;
}

.song {
  font-size: 14px;
}

.singer {
  font-size: 12px;
  color: rgba(0, 0, 0, .45);
}
</style>