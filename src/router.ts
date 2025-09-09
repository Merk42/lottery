import { createWebHistory, createRouter } from 'vue-router'

import EnterEntry from './components/EnterEntry.vue'
import CheckEntry from './components/CheckEntry.vue'
import PickLottery from './components/PickLottery.vue'

const routes = [
  { path: '/etc/lottery', component: PickLottery },
  { path: '/etc/lottery/:lottery/check', name: 'check', component: CheckEntry },
  { path: '/etc/lottery/:lottery/enter', name: 'enter', component: EnterEntry },
  { path: '/:catchAll(.*)', component: PickLottery }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router