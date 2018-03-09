import Vue from 'vue'
import Vuex from 'vuex'
import { SHOW_LOADING, HIDE_LOADING, SHOW_MESSAGE, HIDE_MESSAGE } from './types'
import chart from './modules/chart'
import group from './modules/group'
import page from './modules/page'
import navigation from './modules/navigation'
import build from './modules/build'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const state = {
  message: '',
  loading: false
}
const actions = {}
const getters = {}
const mutations = {
  [SHOW_LOADING] (state) {
    state.loading = true
  },
  [HIDE_LOADING] (state) {
    state.loading = false
  },
  [SHOW_MESSAGE] (state, message) {
    state.message = message
  },
  [HIDE_MESSAGE] (state) {
    state.message = ''
  }
}

export default new Vuex.Store({
  modules: {
    chart,
    group,
    page,
    navigation,
    build
  },
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
