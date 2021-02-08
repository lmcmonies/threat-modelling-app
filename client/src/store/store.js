
import {createStore} from 'vuex'


export default createStore({
  state: {
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
    //   {id: 16, src: require('../assets/EoPCards/Suits/ElevationofPrivilege/7ElevationofPrivilege.png')}
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
        cards: []
    },
    {
        playerId: 3,
        playerName: 'Skeletor',
        cards: []
    }
]
  },
  getters: {
    shuffledCards: state => state.shuffledCardsArray
  },
  mutations: {
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

      let i, j
    //  for(j=0; j < totalPlayers; j++){
    //     for(i=0; i < cardDistribution; i++){
    //       state.players[j].cards.push(state.shuffledCardsArray[i])
    //       state.shuffledCardsArray.pop(i)
    //      // console.log(state.shuffledCardsArray[i])
    //     }
    //  }

    let min = 0
    let max = cardDistribution
    state.players.forEach(function(player){
     player.cards = state.shuffledCardsArray.slice(min, max)
     min += cardDistribution
     max += cardDistribution
     console.log(player.playerId, player.cards)
    })

    //  state.players.cards.forEach(function(card){
    //      console.log(card.id)
    //  })

},
  },
  actions: {
    //   shuffledCards(){
    //       context.commit('shuffleCards')
    //       console.log('Shuffling Cards')
    //   }
      
    
}

  })


