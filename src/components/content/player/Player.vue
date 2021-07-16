<template>
  <div class="music-player">
    <div v-if="isFull" class="full-player">
      <div class="bg" :style="bgImg"></div>
      <nav-bar>
        <div slot="left" @click="goBack">返回</div>
        <div slot="center" class="center">
          <span class="song">{{ song }}</span>
          <div class="singer-wrap">
            <span class="singer" v-for="item in singer" :key="item.id">{{ item.name + " " }}</span>
          </div>
        </div>
        <div slot="right">fav</div>
      </nav-bar>
    </div>

    <div v-else class="mini-player" @click="fullScreen">
      <img :src="picUrl">
    </div>

    <audio ref="audio" :src="songUrl" :autoplay="autoplay" :controls="ctrl"></audio>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import {getMusicUrl, getMusicDetail} from "network/player"

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
  watch: {
    '$store.state.songId'() {
      this.getMusicUrl()
      this.getMusicDetail()
    }
  },
  methods: {
    getMusicUrl() {
      getMusicUrl(this.$store.state.songId).then(res => {
        this.songUrl = res.data[0].url
      }).catch(() => {
        console.log('请求不到该音乐，抱歉')
      })
    },
    getMusicDetail() {
      getMusicDetail(this.$store.state.songId).then(res => {
        this.songDetail = res.songs[0]
        this.song = res.songs[0].al.name
        this.singer = res.songs[0].ar
        this.picUrl = res.songs[0].al.picUrl
      }).catch(() => {
        console.log('请求不到该音乐，抱歉')
      })
    },
    goBack() {
      this.$router.history.go(-1)
    },
    fullScreen() {
      this.$router.push({
        path: '/musicplayer',
        query: {
          songId: this.$store.state.songId
        }
      }).catch(err => err)
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
.song {
  font-size: 13px;
  color: #fff;
}

.singer {
  font-size: 12px;
  color: rgba(200, 200, 200, .6);
}

.music-player {
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.full-player {
  width: 100%;
  height: 100vh;
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

.mini-player, .mini-player img {
  width: 56px;
  height: 56px;
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