<template>
  <div id="profile">
    <div class="item random" @click="btnClick">
      <span>{{words}}</span>
    </div>
    <div class="item">
      <span>前端小白 --- ZzNW</span>
    </div>
    <div class="item">
      <span>本项目基于vue2.x,其全部数据来源于网易云音乐API,致敬开源精神</span>
    </div>
    <a href="https://github.com/ZzNW/code-music">
      <div class="item">
        <span>GitHub地址</span>
      </div>
    </a>
  </div>
</template>

<script>
const WORDS = [
  'DO NOT CLICK PLESE',
  'THIS IS GOOD DAY',
  'IT IS SO GOOD',
  'OH MY GOD YOU ARE SO BEAUTIY GIRL',
  'OH FUCK IT',
  'SHIT',
  'CLICK ME PLESE',
  'SNOW',
  'GOOD DAY',
  'BLUE'
]

export default {
  name: "Profile",
  data() {
    return {
      words: 'CLICK ME PLESE'
    }
  },
  methods: {
    btnClick() {
      let count = ~~(Math.random() * 10)
      this.words = WORDS[count]
    }
  }
}
</script>

<style scoped>
#profile {
  position: fixed;
  bottom: 60px;
  top: 0;
  left: 0;
  right: 0;
}

.item {
  margin: 20px 10px;
  line-height: 60px;
  padding-left: 10px;
  border-radius: 5px;
  box-shadow: 0 0 6px rgba(0,0,0,.1);
}

.item:active {
  background-color: rgba(0,0,0,0.1);
}
</style>