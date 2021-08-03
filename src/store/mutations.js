export default {
  updateSongId(state,NewId) {
    this.state.songId = NewId
  },
  updateIsPlaying(state,NewStatus) {
    this.state.isPlaying = NewStatus
  },
  incMyFav(state,NewSong) {
    this.state.myFav.push(NewSong)
  },
  decMyFav(state,index) {
    this.state.myFav.splice(index, 1)
  }
}