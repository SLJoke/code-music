<template>
  <div class="music-player">
    <div v-if="isFull" class="full-player">
      <div class="bg" :style="bgImg"></div>
      <nav-bar>
        <div slot="left" class="left" @click="goBack">
          <img src="~assets/img/back.svg"/>
        </div>
        <div slot="center" class="center">
          <span class="song">{{ song }}</span>
          <div class="singer-wrap">
            <span class="singer" v-for="item in singer" :key="item.id">{{ item.name + " " }}</span>
          </div>
        </div>
        <div slot="right" class="right" @click="incFav">
          <img src="~assets/img/player/fav.svg">
        </div>
      </nav-bar>
      <div class="player-content">
        <div class="record-wrap" :style="isRotate">
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

    <div v-else class="mini-player" :style="isRotate" @click="fullScreen">
      <img v-lazy="picUrl + '?param=100y100'">
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

import {getMusicUrl, getMusicDetail} from "network/player"

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
      isFull: false
    }
  },
  computed: {
    ...mapState(['songId', 'isPlaying']),

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
  },
  watch: {
    /**
     * 歌曲id改变后 发送新的网络请求
     */
    'songId'() {
      this.getMusicUrl()
      this.getMusicDetail()
    }
  },
  methods: {
    ...mapMutations(['updateIsPlaying']),
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
        this.picUrl = res.songs[0].al.picUrl + '?param=200y200'
      }).catch(() => console.log('请求不到该音乐，抱歉'))
    },
    goBack() {
      this.isFull = false
    },
    fullScreen() {
      this.isFull = true
    },

    /**
     * 添加歌曲到我的喜欢
     */
    incFav() {
      console.log('歌曲添加到了我的喜欢')
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
    //操作歌手栏的dom，若歌手大于一个给它增加间隔符，未实现，待定
    // handleDom() {
    //   let singerEl = document.querySelector('.singer-wrap')
    //   let singerEls = singerEl.getElementsByClassName('singer')
    //   console.log(singerEl,singerEls)
    //   if(this.singer.length > 1) {
    //     for(let i = 0; i < this.singer.length; i++) {
    //       singerEls.insertBefore(<span>/</span>,singerEls.childNodes[i++])
    //     }
    //   }
    // }
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

.play-pause img {
  width: 40px;
  height: 40px;
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

.mini-player, .mini-player img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.mini-player {
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