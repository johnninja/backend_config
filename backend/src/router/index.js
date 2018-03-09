import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import NewChart from '@/components/NewChart'
import NewGroup from '@/components/NewGroup'
import NewPage from '@/components/NewPage'
import Build from '@/components/Build'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/navigation'
    },
    {
      path: '/navigation',
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
    },
    {
      path: '/build',
      name: 'Build',
      component: Build
    }
  ]
})
