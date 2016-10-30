import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  username: '',
  auth: '',
  loadingLogin: false,
  relatedGists: null,
  gists: {},
  closeEdit: false,
  newGist: {
    id: '',
    title: '',
    body: '',
    tags: []
  }
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
    let ls_gists = JSON.stringify(gists)
    localStorage.setItem('GISTS', ls_gists)
  },
  RELATEDGISTS (state, gists) {
    state.relatedGists = gists
  },
  NEWGISTTITLE (state, title) {
    state.newGist.title = title;
  },
  NEWGISTBODY (state, body) {
    state.newGist.body = body
  },
  NEWGISTTAG (state, tag) {
    let tagObject = {
      name: tag.trim()
    }
    state.newGist.tags.push(tagObject)
  },
  CLOSEEDIT (state) {
    state.closeEdit = true;
  }
}

const getters = {
  gistCount: state => {
    return state.gists.length;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})