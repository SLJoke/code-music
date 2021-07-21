<template>
  <nav-bar>
    <div slot="left" @click="goBack">back</div>
    <div slot="center">
      <input 
          type="text" 
          v-model="keywords"
          placeholder="请输入歌曲或者歌手..."
      >
    </div>
    <div slot="right" @click="goSearch">search</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "SearchNavBar",
  components: {NavBar},
  data() {
    return {
      keywords: ''
    }
  },
  props: {
    getSearchData: {
      type: Function,
      default: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goSearch() {
      if(this.keywords !== '') {
        this.getSearchData(this.keywords)
      }
    }
  }
}
</script>

<style scoped>
input[type='text'] {
  width: 100%;
  height: 25px;
  border: none;
  border-radius: 10px;
  border: 1px solid #e69091;
  outline: none;
  text-indent: 5%;
  font-size: 13px;
}

input[type='text']:focus {
  border: 1px solid #d32f32;
}

input[type='text']::-webkit-input-placeholder {
  font-size: 12px;
}
</style>