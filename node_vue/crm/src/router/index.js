import Vue from 'vue'
import Router from 'vue-router'
import commonRouters from './common'
import configRouters from './modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...configRouters,
    ...commonRouters
  ]
})
