import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player:{name:'', health:100, point:0},
    skill:[{name:'tusuk', point:10, damage:10},{name:'tebas', point:20, damage:20},{name:'bacok', point:30, damage:30},{name:'cubit', point:40, damage:40}],
    question:{}
  },
  mutations: {
    setQuestion: function(state,payload){
      state.question = payload
    }
  },
  actions: {
    getQuestion: function(context){
      axios.get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean')
      .then(response=>{
        console.log(response)
        let question = {
          pertanyaan : response.data.results[0]["question"],
          jawaban: response.data.results[0]["correct_answer"] 
        }
        context.commit('setQuestion', question)
        
      })
      .cath(error=>{
        console.log(error)
      })
    }
  }
})
