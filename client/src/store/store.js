
import {createStore} from 'vuex'
import getDocument from '../composables/getDocument'
import {useRoute} from 'vue-router'


export default createStore({
  state: {
    gameId: '',
    playerId: '',
    timerValue: 30,
    playersCards: [],
    allCardsArray: 
    [
      {id: 1, src: require('../assets/EoPCards/Suits/DenialofService/2DenialofService.png')},
      {id: 2, src: require('../assets/EoPCards/Suits/DenialofService/3DenialofService.png')},
      {id: 3, src: require('../assets/EoPCards/Suits/DenialofService/4DenialofService.png')},
      {id: 4, src: require('../assets/EoPCards/Suits/DenialofService/5DenialofService.png')},
      {id: 5, src: require('../assets/EoPCards/Suits/DenialofService/6DenialofService.png')},
      {id: 6, src: require('../assets/EoPCards/Suits/DenialofService/7DenialofService.png')},
      {id: 7, src: require('../assets/EoPCards/Suits/DenialofService/8DenialofService.png')},
      {id: 8, src: require('../assets/EoPCards/Suits/DenialofService/9DenialofService.png')},
      {id: 9, src: require('../assets/EoPCards/Suits/DenialofService/10DenialofService.png')}
      // {id: 10, src: require('../assets/EoPCards/Suits/DenialofService/ADenialofService.png')},
      // {id: 11, src: require('../assets/EoPCards/Suits/DenialofService/JDenialofService.png')},
      // {id: 12, src: require('../assets/EoPCards/Suits/DenialofService/KDenialofService.png')},
      // {id: 13, src: require('../assets/EoPCards/Suits/DenialofService/QDenialofService.png')},
      // {id: 14, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/5ElevationofPrivilege.png')},
      // {id: 15, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/6ElevationofPrivilege.png')},
      // {id: 16, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/7ElevationofPrivilege.png')}
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
     //console.log("STATE TIMER VAL: " + state.timerValue)
    },

    updatePlayerId(state, playerId){
    state.playerId = playerId
    //console.log("Player Id From Store: " + playerId)
    },

    updatePlayersCards(state, playersCards){
     state.playersCards = playersCards
    //  for(let i=0; i<playersCards.length; i++){
    //   console.log("Players Cards Store: " + state.playersCards[i].id)
    //  }
  
    },

    updateGameId(state, id){
    state.gameId = id
    console.log(id)
    },

    updatePlayZone(state, card){
        if(state.playZone.length < 1){
            state.playZone.push(card)
        }

    //console.log('card: ', card.src)
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
            //console.log(card.src)
        })

    },

    distributeCards(state, totalPlayers){
     //let totalPlayers = state.players.length 
     let data = {
      id: document.value.id
    }

    console.log("Store ID: " + data.id)
    //  let numOfCards = state.shuffledCardsArray.length 
    //  let cardDistribution = numOfCards / totalPlayers
    // //  console.log("Total Players: " + totalPlayers)
    // //  console.log("Total Cards: " + numOfCards)
    // //  console.log("Card Distribution: " + cardDistribution)

    // let min = 0
    // let max = cardDistribution
    // state.players.forEach(function(player){
    //  player.cards = state.shuffledCardsArray.slice(min, max)
    //  min += cardDistribution
    //  max += cardDistribution
    //  //console.log(player.playerId, player.cards)
    // })
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


