import fetch from 'isomorphic-fetch'
import * as t from '../types'

const state = {
  applying: false,
  building: false
}

const actions = {
  applyChange ({commit, state}) {
    commit(t.APPLY_CHANGE)
    fetch(t.API + '/build/app', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.SHOW_MESSAGE, 'success')
        } else {
          commit(t.SHOW_MESSAGE, json.message)
        }
        commit(t.HIDE_LOADING)
      })
      .catch(err => {
        commit(t.SHOW_MESSAGE, err.toString())
        commit(t.HIDE_LOADING)
      })
  },
  buildApp ({commit, state}) {
    commit(t.BUILD_APP)
    fetch(t.API + '/build', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.SHOW_MESSAGE, 'success')
        } else {
          commit(t.SHOW_MESSAGE, json.message)
        }
        commit(t.HIDE_LOADING)
      })
      .catch(err => {
        commit(t.SHOW_MESSAGE, err.toString())
        commit(t.HIDE_LOADING)
      })
  }
}

const mutations = {
  [t.APPLY_CHANGE] (state) {
    state.applying = true
  },
  [t.BUILD_APP] (state) {
    state.building = true
  },
  [t.HIDE_LOADING] (state) {
    state.applying = false
    state.building = false
  }
}

export default {
  state,
  actions,
  mutations
}
