import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"

Vue.use(Vuex)

const state = {
    /**
     * 全局播放状态
     */
    isPlaying: false,
    songId: '',
    myFav: []
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store