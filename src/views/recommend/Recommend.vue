<template>
  <scroll class="recommend" ref="scroll">
    <rec-swiper :banners="banners" @swiperid="getMusic"/>
    <rec-view/>
    <rec-hot>
      <rec-hot-item :hots="recommendMusic" :title="'热门歌曲'" @songid="getMusic"></rec-hot-item>
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

import {
  getHomeBanner,
  getHotMusic,
  getHotSongSheet,
} from "network/recommend";

export default {
  name: "Recommend",
  components: {Scroll, RecHotItem, RecSwiper, RecView, RecHot},
  data() {
    return {
      banners: [],
      recommendMusic: [],
      hotSongSheet: [],
      songUrl: ''
    };
  },
  created() {
    this.getHomeBanner();
    this.getHotMusic();
    this.getHotSongSheet();
  },
  mounted() {
    this.$bus.$on('hotItemImgLoad', () => {
      this.$refs.scroll.refresh()
    })
    this.$bus.$on('swiperImgLoad', () => {
      this.$refs.scroll.refresh()
    })
  },
  methods: {
    getHomeBanner() {
      getHomeBanner().then(res => {
            this.banners = res.banners;
            console.log(this.banners)
          }
      );
    },
    getHotMusic() {
      getHotMusic().then(res => {
            this.recommendMusic = res.result;
          }
      );
    },
    getHotSongSheet() {
      getHotSongSheet().then(res => {
        this.hotSongSheet = res.result
      })
    },
    //获取子组件传过来的歌曲id后再发送网络请求，请求歌曲的url
    getMusic(songId) {
      // this.$router.push({
      //   path: '/musicplayer',
      //   query: {
      //     id: songId
      //   }
      // }).catch(err => err)
      //废弃代码
      this.$store.commit('updateSongId', songId)
    },
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