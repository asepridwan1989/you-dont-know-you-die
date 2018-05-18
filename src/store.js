import Vue from 'vue'
import Vuex from 'vuex'
import './firebase'
import firebase from 'firebase'
// import firebase from 'firebase'
// import {db} from '../firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: false,
    username: '',
    health: 100,
    point: 0,
    action: '',
    attack: false,
    answer: false,
    roomName: '',
    rooms: [],
    player: {},
    skill: [{
      name: 'tusuk',
      point: 10,
      damage: 10
    }, {
      name: 'tebas',
      point: 20,
      damage: 20
    }, {
      name: 'bacok',
      point: 30,
      damage: 30
    }, {
      name: 'cubit',
      point: 40,
      damage: 40
    }],
    question: {},
    room: {}
  },
  mutations: {
    changeStatus (state, payload) {
      state.status = payload
    },
    register(state, payload) {
      state.username = payload
    },
    getAllRoom: (state, payload) => {
      state.rooms = payload
    },
    setGameplayData(state, payload) {
      let player = JSON.parse(localStorage.getItem('player'))
      state.room = payload
      state.player = state.room.players[player.turn]
      localStorage.setItem('player', JSON.stringify(state.player))
    },
    setQuestion(state, payload) {
      state.question = payload
    },
    useSkill(state, payload) {
      // cek jika point cukup dan status attack
      if (state.player.point >= state.skill[payload].point && !state.player.attack) {
        let enemyTurn
        // get enemy turn
        (state.player.turn === 0) ? enemyTurn = 1: enemyTurn = 0
        // mengubah point di state player dan room
        state.player.point -= state.skill[payload].point
        state.room.players[state.player.turn].point -= state.skill[payload].point
        // mengurangi health enemy
        state.room.players[enemyTurn].health -= state.skill[payload].damage
        // menambah nama action ke room
        state.room.players[enemyTurn].action = state.skill[payload].name
        // status attack jadi true setelah player attack
        state.player.attack = true
        if (state.room.players[enemyTurn].health <= 0) state.room.winner = state.player.turn
        alert(`Musuh ter${state.skill[payload].name}`)
      } else {
        alert('Tidak bisa pakai skill')
      }
    },
    answering(state, payload) {
      // cek status answer
      if (!state.player.answer) {
        // cek jawaban bener atau enggak
        if (state.question.jawaban === payload) {
          // tambah point player (di localstorage dan firebase)
          // dan ganti status answer
          state.player.point += 20
          state.room.players[state.player.turn].point += 20
          state.player.answer = true
          alert('Benar! lumayan dapat 20 point')
        } else {
          state.player.answer = true
          alert('Salah, dasar bodoh')
        }
      } else {
        alert('Kan udah jawab tadi')
      }
    },
    updatePlayers(state) {
      let enemyTurn
      // get enemy turn
      (state.player.turn === 0) ? enemyTurn = 1: enemyTurn = 0
      // mereset attack dan answer status
      state.player.attack = false
      state.player.answer = false
      // mengganti room turn jadi turn masuh
      state.room.turn = enemyTurn
    }
  },
  actions: {
    getStatusRoom (context, payload) {
      firebase.database().ref('rooms/' + payload + '/status').on('value', function (snapshot) {
        context.commit('changeStatus', snapshot.val())
      })
    },
    createRoom: function (context, payload) {
      firebase.database().ref('rooms/' + payload.name).set(payload.room)
    },
    getAllRoom: function (context) {
      firebase.database().ref('rooms/').on('value', function (snapshot) {
        let arrRoom = []

        snapshot.forEach(value => {
          arrRoom.push(value.val())
        })
        context.commit('getAllRoom', arrRoom)
      })
    },
    joinRoom: function (context, payload) {
      firebase.database().ref(`rooms/${payload.roomName}/players/1`).set(payload.getPlayer)
      firebase.database().ref(`rooms/${payload.roomName}`).update({status: true})
    },
    register(context, payload) {
      firebase.database().ref('users/').push({
        name: payload,
        health: context.state.health,
        point: context.state.point
      })
      context.commit('register', payload)
      let player = {
        name: payload,
        health: context.state.health,
        point: context.state.point
      }
      localStorage.setItem('player', JSON.stringify(player))
      // taruh localstorage biar klo d refresh gk hilang

      // room: {
      //   name: 'room 1',
      //   players: [{
      //     name: 'rex',
      //     health: 100,
      //     point: 0
      //   }, {
      //     name: 'john',
      //     health: 100,
      //     point: 0
      //   }],
      //   turn: 1,
      //   action: '',
      //   status: true,
      //   winner: -1
      // }
    },
    getQuestion(context) {
      axios.get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean')
        .then(response => {
          let question = {
            pertanyaan: response.data.results[0]['question'],
            jawaban: response.data.results[0]['correct_answer']
          }
          context.commit('setQuestion', question)
        })
        .cath(error => {
          console.log(error)
        })
    },
    getGameplayData(context) {
      // db.ref('/rooms').child(context.state.player.roomId).set(context.state.room)
      let player = JSON.parse(localStorage.getItem('player'))
      console.log(player);
      
      let roomRef = firebase.database().ref('/rooms').child(player.roomName)
      roomRef.on('value', function (snapshot) {
        context.commit('setGameplayData', snapshot.val())
      })
    },
    endTurn(context) {
      firebase.database().ref('/rooms').child(context.state.player.roomName).set(context.state.room)
    }
  }
})