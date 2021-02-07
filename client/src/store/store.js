
import {createStore} from 'vuex'


export default createStore({
  state: {
    allCardsArray: 
    [
      {id: 1, src: require('../assets/EoPCards/Suits/DenialofService/2DenialofService.png')},
      {id: 2, src: require('../assets/EoPCards/Suits/DenialofService/3DenialofService.png')}
    ],
  },
  getters: {
    allCards: state => state.allCardsArray
  },
  mutations: {
   
  },
  actions: {

  },
  modules: {

  },
  
})

