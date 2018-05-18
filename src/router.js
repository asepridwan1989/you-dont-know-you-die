import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Lobby from './views/Lobby.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    }
  ]
})
