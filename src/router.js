import Vue from 'vue'
import Router from 'vue-router'
import Lobby from './views/Lobby.vue'
import Register from './views/Register.vue'
import Gameplay from './components/gameplay'
import Wait from './views/Wait'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/gameplay',
      name: 'gameplay',
      component: Gameplay
    },
    {
      path: '/wait',
      name: 'wait',
      component: Wait
    }
  ]
})
