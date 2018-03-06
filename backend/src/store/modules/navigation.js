import fetch from 'isomorphic-fetch'
import * as t from '../types'

const state = {
  list: []
}

const getters = {
  allNavs: state => state.list
}

const actions = {
  getNavigations ({ commit, state }) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/navigations/all')
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.GET_NAVIGATION, json)
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
  addNewNavigation ({commit, state}, data) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/navigations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.ADD_NEW_NAVIGATION, json)
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
  updateNavigation ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/navigations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        navigation: payload.data
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.UPDATE_NAVIGATION, { data: json.data, index: payload.index })
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
  deleteNavigation ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/navigations', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: payload.id
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.DELETE_NAVIGATION, payload.index)
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
  [t.GET_NAVIGATION] (state, payload) {
    state.list = payload.data
  },
  [t.ADD_NEW_NAVIGATION] (state, payload) {
    state.list = [payload.data, ...state.list]
  },
  [t.UPDATE_NAVIGATION] (state, payload) {
    state.list = [...state.list.slice(0, payload.index), payload.data, ...state.list.slice(payload.index + 1)]
  },
  [t.DELETE_NAVIGATION] (state, index) {
    state.list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
