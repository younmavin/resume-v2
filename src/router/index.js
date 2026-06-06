import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),

  routes,

  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'instant',
    }
  },
})

// 페이지 이동 시 항상 맨 위
router.afterEach(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  })
})

export default router
