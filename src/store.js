import './firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      point: 0,
      health: 100
    },
    rooms: []
  },
  mutations: {
    getAllRoom: (state, payload) => { 
      state.rooms = payload
    }
  },
  actions: {
    createRoom: function (context, payload) {
      firebase.database().ref('rooms/' + payload.name).set(payload.room)
    },
    getAllRoom: function (context) {
      firebase.database().ref('rooms/').on('value', function(snapshot) {      
        let arrRoom = []

        snapshot.forEach(value => {
          arrRoom.push(value.val())
        })
        context.commit('getAllRoom', arrRoom)
      })
    },
    joinRoom: function (context, payload) {
      firebase.database().ref(`rooms/${payload.roomName}/players/1`).set(payload.player)
    }
    
  }
})
