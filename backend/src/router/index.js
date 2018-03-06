import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import NewChart from '@/components/NewChart'
import NewGroup from '@/components/NewGroup'
import NewPage from '@/components/NewPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/chart',
      name: 'NewChart',
      component: NewChart
    },
    {
      path: '/group',
      name: 'NewGroup',
      component: NewGroup
    },
    {
      path: '/page',
      name: 'NewPage',
      component: NewPage
    }
  ]
})
