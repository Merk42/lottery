import { createMemoryHistory, createRouter } from 'vue-router'

import EnterEntry from './components/EnterEntry.vue'
import CheckEntry from './components/CheckEntry.vue'

const routes = [
  { path: '/', component: EnterEntry },
  { path: '/check', component: CheckEntry },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router