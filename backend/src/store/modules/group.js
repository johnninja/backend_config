import fetch from 'isomorphic-fetch'
import * as t from '../types'

const state = {
  list: []
}

const getters = {
  allGroups: state => state.list.map(item => {
    item.ids = item.charts.map(c => c._id)
    return item
  })
}

const actions = {
  getGroups ({ commit, state }) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/groups/all')
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.GET_GROUP, json)
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
  addNewGroup ({commit, state}, data) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.ADD_NEW_GROUP, json)
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
  updateGroup ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/groups', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group: payload.data
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.UPDATE_GROUP, { data: json.data, index: payload.index })
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
  deleteGroup ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/groups', {
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
          commit(t.DELETE_GROUP, payload.index)
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
  [t.GET_GROUP] (state, payload) {
    state.list = payload.data
  },
  [t.ADD_NEW_GROUP] (state, payload) {
    state.list = [payload.data, ...state.list]
  },
  [t.UPDATE_GROUP] (state, payload) {
    state.list = [...state.list.slice(0, payload.index), payload.data, ...state.list.slice(payload.index + 1)]
  },
  [t.DELETE_GROUP] (state, index) {
    state.list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
