<template>
  <div class="recs">
    <div class="day-recommend">
      <img src="~assets/img/recommend/day-rec.svg">
      <span>每日推荐</span>
    </div>
    <div class="fav" @click="goFav">
      <img src="~assets/img/recommend/fav.svg">
      <span>我的喜欢</span>
    </div>
    <div class="search" @click="goSearch">
      <img src="~assets/img/recommend/search.svg">
      <span>音乐搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecView",
  methods: {
    goFav() {
      this.$router.push('/fav')
    },
    goSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
.recs {
  width: 100%;
  height: 14%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
}

.recs div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.recs img {
  height: 52px;
  width: 52px;
  border-radius: 15%;
  margin-bottom: 5px;
}
</style>