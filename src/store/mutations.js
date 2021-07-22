export default {
  updateSongId(state,NewId) {
    this.state.songId = NewId
  },
  updateIsPlaying(state,NewStatus) {
      this.state.isPlaying = NewStatus
  }
}