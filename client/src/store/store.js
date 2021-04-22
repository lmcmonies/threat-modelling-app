/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//Vuex central store. Single source of truth for the application interface
import {createStore} from 'vuex'

export default createStore({
  state: {
    gameId: '',
    playerId: '',
    timerValue: 45,
    playersCards: [],
    allCardsArray: 
    [
      {id: 1, src: require('../assets/EoPCards/Suits/Spoofing/7Spoofing.png')},
      {id: 2, src: require('../assets/EoPCards/Suits/Tampering/10Tampering.png')},
      {id: 3, src: require('../assets/EoPCards/Suits/Spoofing/KSpoofing.png')},
      {id: 4, src: require('../assets/EoPCards/Suits/Tampering/3Tampering.png')},
      {id: 5, src: require('../assets/EoPCards/Suits/Repudiation/4Repudiation.png')},
      {id: 6, src: require('../assets/EoPCards/Suits/InformationDisclosure/7InformationDisclosure.png')},
      {id: 7, src: require('../assets/EoPCards/Suits/InformationDisclosure/QInformationDisclosure.png')},
      {id: 8, src: require('../assets/EoPCards/Suits/DenialofService/KDenialofService.png')},
      {id: 9, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/JElevationofPrivilege.png')}
    ],
    shuffledCardsArray: [],
    players: [],

playZone: [],

  },
  getters: {
    shuffledCard(state){return state.shuffledCardsArray},
    getPlayers(state){ return state.players},
    playZoneCard(state){return state.playZone},
    getGameId(state){return state.gameId},
    getPlayersCards(state){return state.playersCards}
  },
  mutations: {

    updatePlayersArray(state, players){
     state.players = players
    },

    decrementTimerValue(state, value){
     state.timerValue = value
    },

    updatePlayerId(state, playerId){
    state.playerId = playerId
    },

    updatePlayersCards(state, playersCards){
     state.playersCards = playersCards
    },

    updateGameId(state, id){
    state.gameId = id
    console.log(id)
    },

    updatePlayZone(state, card){
        if(state.playZone.length < 1){
            state.playZone.push(card)
        }
    },

    shuffleCards(state){   
        //re orders allCardsArray
        for (let i = state.allCardsArray.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = state.allCardsArray[newIndex];
            state.allCardsArray[newIndex] = state.allCardsArray[i];
            state.allCardsArray[i] = oldValue;
        }     

        //transfers cards from allCardsArray to shuffledCardsArray
        state.shuffledCardsArray = state.allCardsArray.map(a => ({...a}));

        state.shuffledCardsArray.forEach(function(card){
        })

    },

    distributeCards(state, totalPlayers){ 
     let data = {
      id: document.value.id
    }
   },

  },
  actions: {
  updatePlayZone({commit}, card){
  commit('updatePlayZone', card )
  },

  updateGameId({commit}, id ){
    commit('updateGameId', id)
  },
  updatePlayerId({commit}, playerId){
   commit('updatePlayerId', playerId)
  },
  updatePlayersCards({commit}, playersCards){
    commit('updatePlayersCards', playersCards)
  },
  decrementTimerValue({commit}, value){
    commit('decrementTimerValue', value)
  },

  updatePlayersArray({commit}, players){
    commit('updatePlayersArray', players)
  }  
}
})


