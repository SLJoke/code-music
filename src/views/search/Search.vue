<template>
  <div id="search">
    <search-nav-bar :getSearchData="getSearchSong"/>
    <scroll ref="searchScroll" class="search-scroll">
      <search-list :searchData="searchData" :refresh="searchImgLoad"/>
    </scroll>
  </div>
</template>

<script>
import SearchNavBar from "./childComps/SearchNavBar"
import SearchList from "./childComps/SearchList"

import Scroll from "components/common/scroll/Scroll"

import {search} from "network/search"

export default {
  name: "Search",
  components: {SearchNavBar, SearchList, Scroll},
  data() {
    return {
      searchData: []
    }
  },
  methods: {
    getSearchSong(keywords) {
      search(keywords).then(res => {
        this.searchData = res.result.songs
        console.log(this.searchData)
      })
    },
    searchImgLoad() {
      this.$refs.searchScroll.refresh()
    }
  }
}
</script>

<style scoped>
#search {
  width: 100%;
  height: 100vh;
}

.search-scroll {
  position: fixed;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>