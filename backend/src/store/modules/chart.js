import fetch from 'isomorphic-fetch'
import * as t from '../types'

const state = {
  list: []
}

const getters = {
  allCharts: state => state.list
}

const actions = {
  getCharts ({ commit, state }) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/charts/all')
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.GET_CHARTS_SUCCESS, json)
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
  addNewChart ({commit, state}, data) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/charts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.ADD_NEW_CHART_SUCCESS, json)
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
  updateChart ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/charts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chart: payload.data
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 0) {
          commit(t.UPDATE_CHART_SUCCESS, { data: json.data, index: payload.index })
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
  deleteChart ({commit, state}, payload) {
    commit(t.SHOW_LOADING)
    fetch(t.API + '/charts', {
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
          commit(t.DELETE_CHART_SUCCESS, payload.index)
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
  [t.GET_CHARTS_SUCCESS] (state, payload) {
    state.list = payload.data
  },
  [t.ADD_NEW_CHART_SUCCESS] (state, payload) {
    state.list = [payload.data, ...state.list]
  },
  [t.UPDATE_CHART_SUCCESS] (state, payload) {
    state.list = [...state.list.slice(0, payload.index), payload.data, ...state.list.slice(payload.index + 1)]
  },
  [t.DELETE_CHART_SUCCESS] (state, index) {
    state.list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
