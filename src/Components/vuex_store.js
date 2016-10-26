import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  username: '',
  auth: '',
  loadingLogin: false,
  gists: []
}

const mutations = {
  USERNAME (state, value) {
    state.username = value;
    localStorage.setItem('username', value)
  },
  AUTH (state, value) {
    state.auth = value;
    localStorage.setItem('auth', value)
  },
  GISTS (state, gists) {
    state.gists = gists;
    localStorage.setItem('GISTS', gists)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})