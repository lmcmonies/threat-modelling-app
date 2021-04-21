/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/
import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue';
import Chatroom from '../views/Chatroom.vue'
import Landing from '../views/Landing.vue'
import CreateGame from '../views/CreateGame.vue'
import { projectAuth } from '../firebase/config'

// auth guards. ensures certain routes cannot be accessed if user isnt logged in. 
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({name: 'landing'})
  } else {
    next()
  }
}

//all the routes for the application for the different views. 
const routes = [
 {
   path: '/',
   name: 'landing',
   component: Landing,
 },
 {
  path: '/welcome',
  name: 'welcome',
  component: Welcome,
 
},
{
  path: '/create',
  name: 'create',
  component: CreateGame,
  beforeEnter: requireAuth
},
 {
  path: "/chatroom/:id",
  name: 'chatroom',
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
