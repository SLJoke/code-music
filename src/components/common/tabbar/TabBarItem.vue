<template>
  <div class="tab-bar-item" @click="tabBarItemClick">
    <div v-if="!tabBarIsActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="tabBarIsActiveColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
      default: '/home'
    },
    activeColor: {
      type: String,
      default: '#d32f32'
    }
  },
  computed: {
    tabBarIsActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    tabBarIsActiveColor() {
      return {color: this.tabBarIsActive? this.activeColor: ''}
    }
  },
  methods: {
    tabBarItemClick() {
      this.$router.replace(this.path).catch(err => err)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
}

</style>