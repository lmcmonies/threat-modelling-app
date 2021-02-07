import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue';
import Chatroom from '../views/Chatroom.vue'
import Landing from '../views/Landing.vue'
import { projectAuth } from '../firebase/config'

// auth guards
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if (!user) {
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const routes = [
 {
   path: '/',
   name: 'Landing',
   component: Landing
 },
 {
  path: '/welcome',
  name: 'welcome',
  component: Welcome
},
 {
  path: '/chatroom',
  name: 'Chatroom',
  component: Chatroom,
  beforeEnter: requireAuth
},
 //catchall 404
 {
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: () => import('../views/404.vue'),
},
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
