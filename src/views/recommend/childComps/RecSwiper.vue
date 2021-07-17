<template>
  <swiper>
    <swiper-item
        v-for="item in banners"
        :key="item.bannerId"
        @click.native="sItemClick(item.targetId)">
      <img :src="item.pic+'?param=200y100'" @load="imgLoad"/>
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
      this.$emit('swiperImgLoad')
    },
    sItemClick(id) {
      this.$emit('swiperid', id)
    }
  }
}
</script>

<style scoped>

</style>