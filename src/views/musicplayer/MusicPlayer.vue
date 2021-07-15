<template>
  <div class="music-player">
    <div class="bg" :style="bgImg"></div>
    <div v-if="isFull" class="full-player">
      <player-nav-bar
          :song="song"
          :singer="singer"
      />
    </div>

    <div v-else class="small-player">
      <img :src="picUrl">
    </div>

    <player :url="songUrl" :autoplay="true"></player>
  </div>

</template>

<script>
import PlayerNavBar from "./childComps/PlayerNavBar"
import Player from "components/content/player/Player"

import {getMusicUrl, getMusicDetail} from "network/player"

export default {
  name: "MusicPlayer",
  components: {PlayerNavBar, Player},
  data() {
    return {
      songId: this.$route.query.id,
      songUrl: '',
      song: '',
      singer: [],
      songDetail: [],
      picUrl: ''
    }
  },
  computed: {
    bgImg() {
      return {background: 'url(' + this.picUrl + ')' + 'center', filter: 'blur(40px)'}
    },
    /**
     * * 判断是否全屏
     */
    isFull() {
      return this.$route.path == '/musicplayer'
    }
  },
  created() {
    this.getMusicUrl()
    this.getMusicDetail()
  },
  methods: {
    getMusicUrl() {
      getMusicUrl(this.songId).then(res => {
        this.songUrl = res.data[0].url
      })
    },
    getMusicDetail() {
      getMusicDetail(this.songId).then(res => {
        this.songDetail = res.songs[0]
        console.log(this.songDetail)
        this.song = res.songs[0].al.name
        this.singer = res.songs[0].ar
        this.picUrl = res.songs[0].al.picUrl
      })
    }
  }
}
</script>

<style scoped>
.music-player {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.full-player {
  width: 100%;
  height: 100%;
}

.bg {
  width: 100%;
  height: 100%;

  /*放大背景，消除高斯函数带来的白边问题*/
  transform: scale(1.4);

  /*设置绝对定位，使背景不会遮盖住主要内容
  使用transfrom放大背景后使用绝对定位会影响背景显示的大小，以致于全部背景都会被显示*/
  /*position: absolute;*/
  /*z-index: -9;*/
}

.small-player .small-player img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
</style>