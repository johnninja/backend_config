import fetch from 'isomorphic-fetch'
import * as t from '../types'

const state = {
  list: []
}

const getters = {
  allPages: state => state.list.map(item => {
    item.ids = item.groups.map(c => c._id)
    return item
  })
}

const actions = {
  getPages ({ commit, state }) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/pages/all')
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.GET_PAGE, json)
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
  addNewPage ({commit, state}, data) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.ADD_NEW_PAGE, json)
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
  updatePage ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/pages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: payload.data
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.UPDATE_PAGE, { data: json.data, index: payload.index })
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
  deletePage ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/pages', {
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
          commit(t.DELETE_PAGE, payload.index)
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
  [t.GET_PAGE] (state, payload) {
    state.list = payload.data
  },
  [t.ADD_NEW_PAGE] (state, payload) {
    state.list = [payload.data, ...state.list]
  },
  [t.UPDATE_PAGE] (state, payload) {
    state.list = [...state.list.slice(0, payload.index), payload.data, ...state.list.slice(payload.index + 1)]
  },
  [t.DELETE_PAGE] (state, index) {
    state.list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
