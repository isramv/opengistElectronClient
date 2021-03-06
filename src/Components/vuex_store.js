import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  // api: 'http://bettergist.io/api/v1/',
  // apiLogin: 'http://bettergist.io/api/login'
  api: 'http://myapp.local/app_dev.php/api/v1/',
  apiLogin: 'http://myapp.local/app_dev.php/api/login',
  isAuth: false,
  loading: {
      status: false,
      message: ''
  },
  username: '',
  auth: '',
  loadingLogin: false,
  relatedGists: null,
  gists: JSON.parse(localStorage.getItem('GISTS')),
  viewGist: {
    id: '',
    title: '',
    body: '',
    tags: []
  },
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
  ISAUTH (state, value) {
    state.isAuth = value
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
  SETNEWGIST (state, gistObject) {
    state.newGist = gistObject
  },
  NEWGISTRESET (state) {
    state.newGist = {
      id: '',
      title: '',
      body: '',
      tags: []
    }
  },
  UPDATELOCALSTORAGE (state) {
    let ls_gists = JSON.stringify(state.gists)
    localStorage.setItem('GISTS', ls_gists)
  },
  VIEWGIST (state, gistObject) {
    state.viewGist = gistObject
  },
  LOADING (state, params) {
    state.loading = params
  }
}

const getters = {
  gistCount: state => {
    return state.gists.length;
  },
  isNewGist: state => {
    if(state.newGist.id.length === 0) {
      return true
    } else {
      return false
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})