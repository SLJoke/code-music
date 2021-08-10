<template>
  <div class="music-player">
    <div v-if="isFull" class="full-player">
      <div class="cover"></div>
      <div class="bg" :style="bgImg"></div>
      <nav-bar>
        <div slot="left" class="left" @click="goBack">
          <img src="~assets/img/back.svg"/>
        </div>
        <div slot="center" class="center">
          <span class="song">{{ song }}</span>
          <div class="singer-wrap">
            <span class="singer">{{ formatSinger }}</span>
          </div>
        </div>
        <div slot="right" class="right">
          <img v-if="isFav" @click="decFav" src="~assets/img/player/fav-active.svg">
          <img v-else @click="incFav" src="~assets/img/player/fav.svg">
        </div>
      </nav-bar>
      <div class="player-content" @click="lyrClick">
        <div v-if="isLyric" class="lyric">
          <p v-for="(item,index) in formatLyric" :key="index">
            {{item}}
          </p>
        </div>
        <div v-else class="record-wrap" :style="isRotate">
          <div class="record">
            <img :src="picUrl">
          </div>
        </div>
      </div>
      <div class="player-timer">
        <span>{{ formatCurrentTime }}</span>
        <input
            id="range"
            class="progress-bar"
            :style="{background: `-webkit-linear-gradient(top, #f1f1f1, #f1f1f1)
            0% 0% / ${currentTime * 1000 / duration * 100}% 100% no-repeat`}"
            type="range"
            :value="currentTime"
            :max="duration / 1000"
            @change="updateCurrentTime"
        />
        <span>{{ formatDuration }}</span>
      </div>
      <div class="player-footer">
        <div class="previous">
          <img src="~assets/img/player/previous.svg"/>
        </div>
        <div class="play-pause">
          <img
              v-show="isPlaying"
              src="~assets/img/player/pause.svg"
              @click="goPaused"
          />
          <img
              v-show="!isPlaying"
              src="~assets/img/player/play.svg"
              @click="goPlay"
          />
        </div>
        <div class="next">
          <img src="~assets/img/player/next.svg">
        </div>
      </div>

    </div>

    <div v-else class="mini-player" @click="fullScreen">
      <img v-lazy="picUrl + '?param=100y100'" :style="isRotate">
    </div>

    <audio
        id="audio"
        ref="audio"
        :src="songUrl"
        :autoplay="autoplay"
        :controls="ctrl"
        @timeupdate="getCurrentTime"
        @playing="playState"
        loop></audio>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import {
  getMusicUrl,
  getMusicDetail,
  getMusicLyric
  } from "network/player"

import {mapState, mapMutations} from "vuex"

export default {
  name: "Player",
  components: {NavBar},
  props: {
    url: {
      type: String,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    ctrl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      songUrl: '',
      song: '',
      picUrl: '',
      duration: 0,
      currentTime: 0,
      singer: [],
      songDetail: [],
      lyric: '',
      isFull: false,
      isLyric: false
    }
  },
  computed: {
    ...mapState(['songId', 'isPlaying','myFav']),

    /**
     * 给播放器动态添加背景
     */
    bgImg() {
      return {
        background: `url(${this.picUrl}) no-repeat center`,
        backgroundSize: `100% 100%`,
        filter: `blur(30px)`
      }
    },
    isRotate() {
      return {animationPlayState: this.isPlaying ? '' : 'paused'}
    },

    formatSinger() {
      let arr = []
      for(let i in this.singer) {
        arr.push(this.singer[i].name)
      }
      return arr.join(' / ')
    },

    formatLyric() {
      const lyrArr = this.lyric.replace(/\[\d*:\d*.\d*\]/g, '')
      const lyr = lyrArr.split('\n')
      return lyr
    },

    isFav() {
      let id = []
      for(let i in this.myFav) {
        id.push(this.myFav[i].id)
      }
      return id.indexOf(this.songId) !== -1
    },
    /**
     * 格式化获取的总歌曲时长为 00:00 格式
     */
    formatDuration() {
      //分钟
      let minute = 0
      //秒
      let second = 0
      minute = parseInt(this.duration / 1000 / 60)
      second = parseInt(this.duration / 1000 % 60)
      if (minute <= 9) {
        minute = '0' + minute
      }
      if (second <= 9) {
        second = '0' + second
      }
      return minute + ':' + second
    },

    /**
     * 格式化获取的当前播放时间格式为 00:00 格式
     */
    formatCurrentTime() {
      let minute = 0
      let second = 0
      if (this.currentTime < 60) {
        second = this.currentTime
      }
      if (this.currentTime >= 60) {
        minute = parseInt(this.currentTime / 60)
        second = parseInt(this.currentTime % 60)
      }
      if (minute <= 9) {
        minute = '0' + minute
      }
      if (second <= 9) {
        second = '0' + second
      }
      return minute + ':' + second
    }
  },
  created() {
    this.getMusicUrl()
    this.getMusicDetail()
    this.getMusicLyric()
  },
  watch: {
    /**
     * 歌曲id改变后 发送新的网络请求
     */
    'songId'() {
      this.getMusicUrl()
      this.getMusicDetail()
      this.getMusicLyric()
    }
  },
  methods: {
    ...mapMutations(['updateIsPlaying','incMyFav','decMyFav']),
    /**
     * 封装网络请求为方法
     */
    getMusicUrl() {
      getMusicUrl(this.songId).then(res => {
        this.songUrl = res.data[0].url
      }).catch(() => console.log('请求不到该音乐，抱歉'))
    },
    getMusicDetail() {
      getMusicDetail(this.songId).then(res => {
        this.songDetail = res.songs[0]
        this.song = res.songs[0].al.name
        this.singer = res.songs[0].ar
        this.duration = res.songs[0].dt
        this.picUrl = res.songs[0].al.picUrl + '?param=250y250'
      }).catch(() => console.log('请求不到该音乐，抱歉'))
    },
    getMusicLyric() {
      getMusicLyric(this.songId).then(res => {
        this.lyric = res.lrc.lyric
      })
    },
    goBack() {
      this.isFull = false
    },
    fullScreen() {
      this.isFull = true
    },
    lyrClick() {
      this.isLyric = !this.isLyric
    },

    /**
     * 添加歌曲到我的喜欢
     */
    incFav() {
      console.log('歌曲添加到了我的喜欢')
      this.incMyFav({
        'id': this.songId,
        'song': this.song,
        'singer': this.singer[0].name
      })
    },
    decFav() {
      let index = 0
      for(let i in this.myFav) {
        if(this.myFav[i].id === this.songId) index = i
      }
      this.decMyFav(index)
    },

    /**
     * 动态获取歌曲当前播放时间
     */
    getCurrentTime() {
      //使用document 确保能获取到audio、控制台不报错
      this.currentTime = parseInt(document.getElementById('audio').currentTime)

      //$refs.audio可能会存在获取不到audio的情况，控制台会报错
      // this.currentTime = parseInt(this.$refs.audio.currentTime)
    },

    /**
     * 拖动进度条后改变当前播放歌曲的时间
     */
    updateCurrentTime() {
      document.getElementById('audio').currentTime = document.getElementById('range').value
    },

    playState() {
      this.updateIsPlaying(true)
    },

    goPrevious() {

    },
    goPlay() {
      const audio = document.getElementById('audio')
      audio.play()
      this.updateIsPlaying(!audio.paused)
    },
    goPaused() {
      const audio = document.getElementById('audio')
      audio.pause()
      this.updateIsPlaying(!audio.paused)
    },
    goNext() {

    }
  }
}
</script>

<style scoped>
.music-player {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.full-player {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, .2);
  z-index: -5;
}

.bg {
  width: 100%;
  height: 100%;

  /*放大背景，消除高斯函数带来的白边问题*/
  transform: scale(2);

  position: absolute;
  z-index: -9;
}

.player-content {
  margin-top: 44px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}

.lyric {
  height: 100%;
  color: #d6d2d2;
  font-size: 16px;
  text-align: center;
}

.lyric p {
  margin: 10px 0;
}

.record-wrap {
  width: 265px;
  height: 265px;
  border-radius: 50%;
  background-color:  rgba(100, 100, 100, .2);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rot 50s linear infinite;
}

.record {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color:  rgba(0, 0, 0, .9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.record img {
  width: 243px;
  height: 243px;
  border-radius: 50%;
}

.player-timer {
  font-size: 12px;
  color: #f7f1f1;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
}

.progress-bar {
  width: 80%;
  margin: 0 2%;
  height: 3px;
  background-color: rgb(158, 145, 145, .3) !important;
  /* 清除input range默认样式 */
  -webkit-appearance: none;
  border-radius: 10px;
}

/* 清除进度条滑轨样式 */
.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 6px;
  width: 6px;
  background-color: #ffffff;
  border-radius: 15px;
}

/* 自定义控件样式 */
/* .progress-bar::-webkit-slider-runnable-track {
  height: 3px;
  border-radius: 10px;
  background-color: rgba(50,50,50,.7);
} */

/* 原始的控件获取到焦点时，会显示包裹整个控件的边框，需要把边框取消 */
/*.progress-bar:focus {*/
/*  outline: none;*/
/*}*/

.player-footer {
  height: 18%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.previous img, .next img {
  width: 35px;
  height: 35px;
}

.play-pause {
  margin: 0 40px;
}

.play-pause img {
  width: 45px;
  height: 45px;
}

.left {
  margin-left: 10px;
}

.right {
  margin-right: 10px;
}

.left img, .right img {
  width: 22px;
  height: 22px;
}

.song {
  font-size: 13px;
  color: #fff;
}

.singer {
  font-size: 12px;
  color: rgba(200, 200, 200, .6);
}

.mini-player {
  width: 60px;
  height: 60px;
  border-radius: 50%;

  position: absolute;
  bottom: 10%;
  right: 4%;

  background-color: rgba(20, 20, 20);

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.4);
}

.mini-player:active {
  box-shadow: 0 8px 10px rgba(100, 100, 100, 0.8);
}

.mini-player img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  animation: rot 16s linear infinite;
}



@keyframes rot {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}
</style>