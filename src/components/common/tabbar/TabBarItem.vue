<template>
  <div class="tab-bar-item">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      isActive: true
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;

}

.tab-bar-item img {
  width: 24px;
  height: 24px;
}
</style>