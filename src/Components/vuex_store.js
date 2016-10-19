import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {

}

const mutations = {
  HELLO (state) {
    console.log("hello world")
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})