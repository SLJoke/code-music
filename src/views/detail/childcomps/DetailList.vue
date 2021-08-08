<template>
  <div class="detail-list">
    <div
        class="detail-item"
        v-for="item in detailData"
        :key="item.id"
        @click="goToPlay(item.id)"
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
  name: "DetailList",
  props: {
    detailData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    ...mapMutations(['updateSongId']),
    goToPlay(id) {
      this.updateSongId(id)
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.detail-list {
  width: 100%;
}

.detail-item {
  height: 60px;
  display: flex;
  border-bottom: 1px solid #d32f32;
  margin: 5%;
  /* background-color: rgba(0, 0, 0, .05); */
}

.detail-item img {
  width: 50px;
  height: 50px;
}

.detail-item div {
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