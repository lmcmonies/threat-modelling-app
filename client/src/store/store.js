
import {createStore} from 'vuex'
import getDocument from '../composables/getDocument'
import {useRoute} from 'vue-router'


export default createStore({
  state: {
    gameId: '',
    allCardsArray: 
    [
      {cardId: 1, src: require('../assets/EoPCards/Suits/DenialofService/2DenialofService.png')},
      {cardId: 2, src: require('../assets/EoPCards/Suits/DenialofService/3DenialofService.png')},
      {cardId: 3, src: require('../assets/EoPCards/Suits/DenialofService/4DenialofService.png')},
      {cardId: 4, src: require('../assets/EoPCards/Suits/DenialofService/5DenialofService.png')},
      {cardId: 5, src: require('../assets/EoPCards/Suits/DenialofService/6DenialofService.png')},
      {cardId: 6, src: require('../assets/EoPCards/Suits/DenialofService/7DenialofService.png')},
      {cardId: 7, src: require('../assets/EoPCards/Suits/DenialofService/8DenialofService.png')},
      {cardId: 8, src: require('../assets/EoPCards/Suits/DenialofService/9DenialofService.png')},
      {cardId: 9, src: require('../assets/EoPCards/Suits/DenialofService/10DenialofService.png')},
      {cardId: 10, src: require('../assets/EoPCards/Suits/DenialofService/ADenialofService.png')},
      {cardId: 11, src: require('../assets/EoPCards/Suits/DenialofService/JDenialofService.png')},
      {cardId: 12, src: require('../assets/EoPCards/Suits/DenialofService/KDenialofService.png')},
      {cardId: 13, src: require('../assets/EoPCards/Suits/DenialofService/QDenialofService.png')},
      {cardId: 14, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/5ElevationofPrivilege.png')},
      {cardId: 15, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/6ElevationofPrivilege.png')},
      {cardId: 16, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/7ElevationofPrivilege.png')}
    ],
    shuffledCardsArray: [],

    players: [{
        playerId: 1,
        playerName: 'Heman',
        cards: []
    },
    {
        playerId: 2,
        playerName: 'Grayskull',
        cards: [],
    },
    {
        playerId: 3,
        playerName: 'Skeletor',
        cards: [],
    },
    {
        playerId: 4,
        playerName: 'Superman',
        cards: [],
    }],

playZone: [],

  },
  getters: {
    shuffledCard(state){return state.shuffledCardsArray},
    playersCards(state){ return state.players[0].cards},
    playZoneCard(state){return state.playZone},
    getGameId(state){return state.gameId}
  },
  mutations: {
    updateGameId(state, id){
    state.gameId = id
    console.log(id)
    },

    updatePlayZone(state, card){
        if(state.playZone.length < 1){
            state.playZone.push(card)
        }

    console.log('card: ', card.src)
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
           // console.log(card.src)
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
  }
      
    
}

  })


