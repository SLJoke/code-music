<template>
  <div ref="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Scroll",
  props: {
    /**
     *监听实时滚动位置
     *0，1不监听
     *2 不会惯性监听
     *3 有惯性监听
     */
    probeType: {
      type: Number,
      default: 0
    },
    /**
     *是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     *是否横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs["scroll-wrapper"], {
      probeType: this.probeType,
      click: this.click,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      stopPropagation: this.stopPropagation
    })
  },
  methods: {
    refresh() {
      console.log('---')
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>