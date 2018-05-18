import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Gameplay from './components/gameplay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/gameplay',
      name: 'Gameplay',
      component: Gameplay
    }
  ]
})
