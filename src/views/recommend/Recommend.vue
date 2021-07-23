<template>
  <scroll class="recommend" ref="scroll">
    <div class="scroll-content">
      <rec-swiper
          :banners="banners"
          @swiperid="getMusic"
          @swiperImgLoad="loadRefresh"
      />
      <rec-view/>
      <rec-hot :title="'热门歌曲'">
        <scroll
            class="hot-scroll"
            ref="itemscroll"
            :scrollX="true"
            :scrollY="false"
            :stopPropagation="true"
        >
          <rec-hot-item
              class="hot-song"
              :hots="recommendMusic"
              @songid="getMusic"
              @hotItemImgLoad="loadRefresh"
          />
        </scroll>
      </rec-hot>
      <rec-hot :title="'热门榜单'">
        <rec-hot-item class="hot-list" :hots="hotSongSheet" @songid="goToDetail"/>
      </rec-hot>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import RecSwiper from "./childComps/RecSwiper";
import RecView from "./childComps/RecView";
import RecHot from "./childComps/RecHot";
import RecHotItem from "./childComps/RecHotItem";

import {debounce} from "common/utils"
import {mapMutations} from "vuex"

import {
  getHomeBanner,
  getHotMusic,
  getHotSongSheet,
} from "network/recommend"

export default {
  name: "Recommend",
  components: {Scroll, RecHotItem, RecSwiper, RecView, RecHot},
  data() {
    return {
      banners: [],
      recommendMusic: [],
      hotSongSheet: [],
      songUrl: ''
    }
  },
  created() {
    /**
     * 发送网络请求
     */
    this.getHomeBanner()
    this.getHotMusic()
    this.getHotSongSheet()
  },
  mounted() {
    /**
     * 减少重新计算可滚动区域的次数
     * @type {(function(...[*]=): void)|*}
     */
    this.refresh1 = debounce(this.$refs.scroll.refresh, 1000)
    this.refresh2 = debounce(this.$refs.itemscroll.refresh, 1000)
  },
  methods: {
    /**
     * vuex mutations辅助函数
     */
    ...mapMutations(['updateSongId','updateIsPlaying']),

    /**
     * 封装网络请求方法
     */
    getHomeBanner() {
      getHomeBanner().then(res => {
        this.banners = res.banners
      })
    },
    getHotMusic() {
      getHotMusic().then(res => {
        this.recommendMusic = res.result
      })
    },
    getHotSongSheet() {
      getHotSongSheet().then(res => {
        this.hotSongSheet = res.result
      })
    },

    /**
     * 将子组件传过来的歌曲id同步给vuex
     */
    getMusic(songId) {
      this.updateSongId(songId)
    },

    goToDetail(id) {
      this.$router.push({
        path: '/playlist/detail',
        query: {
          id: id
        }
      })
    },

    /**
     * 图片加载完后重新刷新计算可滚动高度
     */
    loadRefresh() {
      this.refresh1()
      this.refresh2()
    }
  }
}
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

.hot-scroll {
  width: 94%;
  margin: 0 3% 0 3%;
  overflow: hidden;
}

.hot-song {
  width: max-content;
  display: flex;
  margin-top: 10px;
}

.hot-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
</style>