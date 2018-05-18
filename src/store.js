import './firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    health: 100,
    point: 0,
    action: '',
    attack: false,
    answer: false,
    roomName: '',
  },
  mutations: {
    register (state, payload) {
      state.username = payload
    }
  },
  actions: {
    register(context, payload) {
      firebase.database().ref('users/').push({
        username: payload,
        health: context.state.health,
        point : context.state.point
      })
      context.commit('register', payload)
      let player = {
        username: payload,
        health: context.state.health,
        point : context.state.point
      }
      localStorage.setItem('player', JSON.stringify(player))
    }
  }
})
