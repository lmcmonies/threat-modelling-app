
import {createStore} from 'vuex'


export default createStore({
  state: {
    gameId: '',
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
      {id: 9, src: require('../assets/EoPCards/Suits/DenialofService/10DenialofService.png')},
      {id: 10, src: require('../assets/EoPCards/Suits/DenialofService/ADenialofService.png')},
      {id: 11, src: require('../assets/EoPCards/Suits/DenialofService/JDenialofService.png')},
      {id: 12, src: require('../assets/EoPCards/Suits/DenialofService/KDenialofService.png')},
      {id: 13, src: require('../assets/EoPCards/Suits/DenialofService/QDenialofService.png')},
      {id: 14, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/5ElevationofPrivilege.png')},
      {id: 15, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/6ElevationofPrivilege.png')},
      {id: 16, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/7ElevationofPrivilege.png')}
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
            console.log(card.src)
        })

    },

    distributeCards(state){
     let totalPlayers = state.players.length 
     let numOfCards = state.shuffledCardsArray.length 
     let cardDistribution = numOfCards / totalPlayers
     console.log("Total Players: " + totalPlayers)
     console.log("Total Cards: " + numOfCards)
     console.log("Card Distribution: " + cardDistribution)

    let min = 0
    let max = cardDistribution
    state.players.forEach(function(player){
     player.cards = state.shuffledCardsArray.slice(min, max)
     min += cardDistribution
     max += cardDistribution
     console.log(player.playerId, player.cards)
    })
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


