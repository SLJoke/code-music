<template>
  <nav-bar>
     <div slot="left" @click="goBack">返回</div>
     <div slot="center" class="center">
       <span class="song">{{song}}</span>
       <div class="singer-wrap">
         <span class="singer" v-for="item in singer" :key="item.id">{{item.name+" "}}</span>
       </div>
     </div>
     <div slot="right">fav</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "playerNavBar",
  components: {NavBar},
  props: {
    song: {
      type: String,
      default: ''
    },
    singer: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    goBack() {
      this.$router.history.go(-1)
    },

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
.center {

}
.song {
  font-size: 13px;
  color: #fff;
}
.singer {
  font-size: 12px;
  color: rgba(200,200,200,.6);
}
</style>