import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    /**
     * 全局播放状态
     */
    isPlaying: false
}

const store = new Vuex.store({
    state,
})

export default store