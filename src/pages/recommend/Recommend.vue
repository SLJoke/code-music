<template>
  <div class="recommend">
    <rec-swiper :banners="banners"></rec-swiper>
    <rec-view/>
    <rec-hot :hots="recommendMusic"/>
  </div>
</template>

<script>
import RecSwiper from "./childComps/RecSwiper"
import RecView from "./childComps/RecView"
import RecHot from "./childComps/RecHot"

import {
  getHomeBanner,
  getHotMusic
} from "network/recommend"

export default {
  name: "Recommend",
  components: {RecSwiper, RecView, RecHot},
  data() {
    return {
      banners: [],
      recommendMusic: []
    }
  },
  created() {
    this.getHomeBanner()
    this.getHotMusic()
  },
  methods: {
    getHomeBanner() {
      getHomeBanner().then(res => {
        this.banners = res.banners
      },err => {
        console.log(err)
      })
    },
    getHotMusic() {
      getHotMusic().then(res => {
        this.recommendMusic = res.result
      },err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.recommend {
  overflow-y: scroll;

  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>