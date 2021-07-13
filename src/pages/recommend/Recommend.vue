<template>
  <scroll class="recommend" ref="scroll">
    <rec-swiper :banners="banners"/>
    <rec-view/>
    <rec-hot>
      <rec-hot-item :hots="recommendMusic" :title="'热门歌曲'"></rec-hot-item>
      <rec-hot-item :hots="hotSongSheet" :title="'热门榜单'"></rec-hot-item>
    </rec-hot>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import RecSwiper from "./childComps/RecSwiper";
import RecView from "./childComps/RecView";
import RecHot from "./childComps/RecHot";
import RecHotItem from "./childComps/RecHotItem";

import {getHomeBanner, getHotMusic, getHotSongSheet} from "network/recommend";

export default {
  name: "Recommend",
  components: {RecHotItem, Scroll, RecSwiper, RecView, RecHot},
  data() {
    return {
      banners: [],
      recommendMusic: [],
      hotSongSheet: []
    };
  },
  created() {
    this.getHomeBanner();
    this.getHotMusic();
    this.getHotSongSheet()
  },
  mounted() {
    this.$bus.$on('hotItemImgLoad',() => {
      this.$refs.scroll.refresh()
    })
    this.$bus.$on('swiperImgLoad',() => {
      this.$refs.scroll.refresh()
    })
  },
  methods: {
    getHomeBanner() {
      getHomeBanner().then(
          (res) => {
            this.banners = res.banners;
          },
          (err) => {
            console.log(err);
          }
      );
    },
    getHotMusic() {
      getHotMusic().then(
          (res) => {
            this.recommendMusic = res.result;
          },
          (err) => {
            console.log(err);
          }
      );
    },
    getHotSongSheet() {
      getHotSongSheet().then(res => {
        this.hotSongSheet = res.result
      })
    }
  },
};
</script>

<style scoped>
.recommend {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>