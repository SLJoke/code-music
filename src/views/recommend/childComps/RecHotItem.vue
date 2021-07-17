<template>
  <div class="recommend-hot-content">
    <div class="hot-item"
         v-for="item in hots"
         :key="item.id"
         @click="songClick(item.id)"
    >
      <img v-lazy="item.picUrl+'?param=100y100'" alt="" @load="imgLoad">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecHotItem',
  props: {
    hots: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit('hotItemImgLoad')
    },
    songClick(id) {
      this.$emit('songid', id)
    }
  }
}
</script>

<style scoped>
.hot-item {
  flex: 0 1 29%;
  height: 110px;
  margin-left: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.hot-item img {
  width: 80px;
  border-radius: 10%;
  box-shadow: 0 0 3px rgba(100, 100, 100, .9);
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