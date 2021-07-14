<template>
 <div class="music-player">
   <div class="bg" :style="bgImg"></div>
   <player-nav-bar
       :song="song"
       :singer="singer"
   />

   <player :url="songUrl" :autoplay="true"></player>
 </div>
</template>

<script>
import playerNavBar from "./childComps/playerNavBar";
import Player from "components/content/player/Player";

import {getMusicUrl, getMusicDetail} from "network/player";

export default {
  name: "MusicPlayer",
  components: {playerNavBar, Player},
  data() {
    return {
      songUrl: '',
      song: '',
      singer: [],
      songDetail: [],
      picUrl: ''
    }
  },
  computed: {
    bgImg() {
      return {background: "url("+this.picUrl+")",filter: 'blur(10px)'}
    }
  },
  created() {
    this.getMusicUrl()
    this.getMusicDetail()
  },
  methods: {
    getMusicUrl() {
      getMusicUrl(this.$route.query.id).then(res => {
        this.songUrl = res.data[0].url
      })
    },
    getMusicDetail() {
      getMusicDetail(this.$route.query.id).then(res => {
        this.songDetail = res.songs[0]
        console.log(this.songDetail)
        this.song = res.songs[0].al.name
        this.singer = res.songs[0].ar
        this.picUrl = res.songs[0].al.picUrl
      })
    },
  }
}
</script>

<style scoped>
.music-player {
  width: 100%;
  height: 100vh;
  background-color: rgba(20,20,20,.6);

}

.bg {
  width: 100%;
  height: 100vh;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -9;
}
</style>