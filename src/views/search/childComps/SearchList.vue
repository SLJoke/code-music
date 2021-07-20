<template>
  <div class="search-list">
    <div
        class="search-item"
        v-for="item in searchData"
        :key="item.id"
        @click="searchSongId(item.id)"
    >
      <img :src="item.al.picUrl + '?param=100y100'" @load="refresh">
      <div>
        <div>{{item.name}}</div>
        <div>{{item.ar[0].name}}</div>
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
    },
    refresh: {
      type: Function,
      default:function() {}
    }
  },
  methods: {
    ...mapMutations(['updateSongId']),
    searchSongId(id) {
      this.updateSongId(id)
    }
  }
}
</script>

<style scoped>
.search-list {
  width: 100%;
}

.search-item {
  width: 100%;
  height: 80px;
  display: flex;
  margin: 10px 0;
  background-color: rgba(0, 0, 0, .05);
}

.search-item img {
  width: 70px;
  height: 70px;
}
</style>