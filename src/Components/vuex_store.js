import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  username: '',
  auth: '',
  loadingLogin: false
}

const mutations = {
  USERNAME (state, value) {
    state.username = value;
    localStorage.setItem('username', value)
  },
  ACCESSTOKEN (state, value) {
    state.auth = value;
    localStorage.setItem('auth', value)
  },
  LOGLOCALSTORE (state) {
    console.log(localStorage)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})