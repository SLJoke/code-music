<template>
  <div class="recommend-hot">
    <div class="recommend-hot-bar">
      <img src="~assets/img/recommend/hot.svg"/>
      <span>热门歌曲</span>
    </div>
    <div class="recommend-hot-content">
      <div class="hot-item"
           v-for="item in hots"
           :key="item.id">
        <img :src="item.picUrl">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecHot",
  props: {
    hots: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend-hot {
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

.recommend-hot-content {
  display: flex;
  flex-wrap: wrap;
}

.hot-item {
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1.3rem 0 1.3rem;
  flex: auto;
}

.hot-item img {
  width: 80px;
  border-radius: 10%;
  box-shadow: 0 0 3px rgba(100,100,100,.9);
}

.hot-item span {
  font-size: 14px;
  width: 60px;
  height: 18px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
}
</style>