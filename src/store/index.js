import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    /**
     * 全局播放状态
     */
    isPlaying: false,
    songId: ''
}

const store = new Vuex.Store({
    state,
    mutations: {
        updateSongId(state,NewId) {
            this.state.songId = NewId
        },
        updateIsPlaying(state,NewStatus) {
            this.state.isPlaying = NewStatus
        }
    }
})

export default store