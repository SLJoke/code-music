<template>
  <div class="recommend">
    <rec-swiper :banners="banners"></rec-swiper>
  </div>
</template>

<script>
import RecSwiper from "./childComps/RecSwiper"

import {getHomeBanner} from "network/recommend"

export default {
  name: "Recommend",
  components: {RecSwiper},
  data() {
    return {
      banners: []
    }
  },
  created() {
    getHomeBanner().then(res => {
      this.banners = res.banners
    },err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>