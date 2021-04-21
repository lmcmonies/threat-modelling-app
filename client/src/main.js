/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';

import './assets/main.css';

import { projectAuth } from './firebase/config'

let app

//Vue application is mounted here.
projectAuth.onAuthStateChanged(() => {
if(!app){
    app = createApp(App).use(store).use(router).mount('#app')
}
})

