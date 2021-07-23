<template>
  <div class="details-wrap">
    <detail-nav-bar :detailName="detailName"></detail-nav-bar>
    <scroll ref="detailScroll" class="detail-scroll">
      <detail-list :detailData="tracks" @refresh="detailImgLoad"></detail-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"

import DetailNavBar from "./childcomps/DetailNavBar"
import DetailList from "./childcomps/DetailList"

import {debounce} from "common/utils"

import {getPlayListDetail} from "network/detail"
export default {
  name: 'Detail',
  components: {Scroll, DetailNavBar, DetailList},
  data() {
    return {
      tracks: [],
      detailName: ''
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
    this.deRefresh = debounce(this.$refs.detailScroll.refresh, 1000)
  },
  methods: {
    getDetail() {
      getPlayListDetail(this.$route.query.id).then(res => {
        this.tracks = res.playlist.tracks
        this.detailName = res.playlist.name
      })
    },
    detailImgLoad() {
      this.deRefresh()
    }
  }
}
</script>

<style scoped>
.details-wrap {
  width: 100%;
  height: 100vh;
}

.detail-scroll {
  position: fixed;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>