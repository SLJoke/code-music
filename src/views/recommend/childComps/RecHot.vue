<template>
  <div class="recommend-hot">
    <div class="recommend-hot-bar">
      <img src="~assets/img/recommend/hot.svg"/>
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RecHot",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.recommend-hot {
  width: 100%;
  margin-top: 10px;
}

.recommend-hot-bar {
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  display: flex;
  padding-left: 8px;
}

.recommend-hot-bar img {
  height: 22px;
}
</style>