<template>
  <div class="scroll-wrap" ref="scrollwrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Scroll",
  props: {
    /*
    **监听实时滚动位置
    **0，1不监听  
    **2 不会惯性监听
    **3 有惯性监听
    */
    probeType: {
      type: Number,
      default: 0
    },
    /*
    **是否派发click事件
    */
    click: {
      type: Boolean,
      default: true
    },
    /*
    **是否横向滚动
    */
    scrollX: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scrollwrap, {
      probeType: this.probeType,
      click: this.click,
      scrollX: this.scrollX
    })
  },
  methods: {
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>