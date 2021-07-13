<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" @load="imgLoad"/>
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper"
import SwiperItem from "components/common/swiper/SwiperItem"

export default {
  name: "RecSwiper",
  components: {Swiper, SwiperItem},
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('swiperImgLoad')
    }
  }
}
</script>

<style scoped>

</style>