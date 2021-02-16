<template>
  <div class="hand-area">
      <!-- <div v-for="card in playersCardsArray" v-bind:key="card.id">
            <figure><img class="card" :src="card.src" @click="transferCard(card)" /></figure>
           
      </div> -->
      <!-- <button class="button" @click="showResult">Show Result</button>  -->
        <div v-for="card in playersCards" v-bind:key="card.id">
           <figure><img class="card" :src="card.src" @click="updatePlayZone(card)"/></figure>
        </div> 
      <!-- <div v-for="doc in players" :key="doc.id" class="single">
            <span class="playersJoined">{{doc.id}}</span>
            <span class="totalPLayers">{{doc}}</span> 
        </div>  -->
  
  </div>
</template>

<script>
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import getUser from '../composables/getUser'
import getDocument from '../composables/getDocument'
import getSubCollection from '../composables/getSubCollection'
import getSubSubCollection from '../composables/getSubSubCollection'
import { computed, onUpdated, ref, watch } from 'vue'
import {projectFirestore, aUnion, timestamp} from '../firebase/config'
import {formatDistanceToNow} from 'date-fns'

export default {
    setup(){
       const { user } = getUser()

  const route = useRoute()
    let shuffledCards = computed(() => store.state.shuffledCardsArray)
    let playersCards = computed(() => store.state.playersCards)
    //let playerId = computed(() => store.state.playerId)
    
  
  

  const store = useStore()
  const {shuffleCards} = useMutations(['shuffleCards'])
  const {updatePlayersCards} = useActions(['updatePlayersCards'])
  const {updatePlayerId} = useActions(['updatePlayerId'])
  const {getPlayerId} = useGetters(['getPlayerId'])

  //let gameId = route.params.id.toString()
  let gamesCollection = 'games'
  let playersCollection = 'players'
  let cardsCollection = 'cards'
  let playerId = 'm1XfnogzeTXzOLMhKYQ2'
  let gameId = route.params.id.toString()

  var subRef = projectFirestore.collection(gamesCollection).doc(gameId).collection(playersCollection)




  const { gameDocument, gameDocumentError} =  getDocument(gamesCollection, gameId)
  const { players, playersError} =  getSubCollection(gamesCollection, gameId, playersCollection)
  const { cards, cardsError} =  getSubSubCollection(gamesCollection, gameId, playersCollection, playerId, cardsCollection )



let playersArray = []

  

 let distributeCards = async () => {
      
      //console.log("DISTRIBUTING CARDS")
      // shuffledCards.value.forEach(card => {console.log(card.id)})

     let docData = {totalPlayers:gameDocument.value.totalPlayers}

     let totalPlayers = docData.totalPlayers
    // console.log("Total Players: " + totalPlayers)
     let numOfCards =  shuffledCards.value.length
     //console.log("Shuffled Cards Length: "+ shuffledCards.value.length)

     let cardDistribution = numOfCards / totalPlayers
     //console.log("Card Distribution: " + cardDistribution)

      let min = 0
     let max = cardDistribution
    
    let cardGenerator = () => {
        let cardIds = []
         //console.log("Min: " + min)
          //console.log("Max: " + max)
      
      for(let i = min; i<max; i++)
      {
      // console.log("Card ID: " + shuffledCards.value[i].id)
       cardIds.push(shuffledCards.value[i])
      }

       min += cardDistribution
       max += cardDistribution
       return cardIds
    } 


   for (let i=0; i < players.length; i++){
        let cardIds = cardGenerator()
         for (let x=0; x < cardDistribution; x++){
         //subRef.doc(players[i]).gamesCollection('cards').add(cardIds[x])
        }
     }
 }

  watch(gameDocument, async () => {
 
       let data = {
          playersJoined: gameDocument.value.playersJoined,
          totalPlayers: gameDocument.value.totalPlayers,
          gameActive: gameDocument.value.isGameActive
        }
     if(data.playersJoined === data.totalPlayers){
      if(!data.gameActive){
      shuffleCards()
     await distributeCards()
       }
     }
    });

    watch(players, async () => {
        let playerIds = []

    for(let i=0; i < players.value.length; i++){
      if(playerIds[i] !== players.value[i].id){
      playerIds.push(players.value[i])
      }
    }

    if(playerIds.length === gameDocument.value.totalPlayers){
     for(let x=0; x< playerIds.length; x++){
       playersArray.push(playerIds[x].id)
       ///console.log("Players" + players[x])
        
       if(playerIds[x].email === user.value.email){
        updatePlayerId(playerIds[x].id)
       }  
     }
    }
  })






watch(cards, async () => {
  let cardsArray = await retrieveCards()
  updatePlayersCards(cardsArray)
})

    let retrieveCards = async () => {
      let cardsArray = []
      for(let i=0; i < players.value.length; i++){
      if(user.value.email === players.value[i].email){
        for(let x=0; x < cards.value.length; x++){
          cardsArray.push(cards.value[x])
        }
      }
    }
    return cardsArray

    }
    return {gameDocument, players, playersError, gameDocumentError, cards, cardsError, playersCards}
            
    
    }
}
</script>

<style scoped>
.hand-area{

  height:100%;   
  width: 90%;
  font-family: 'Trebuchet MS';
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #4CAF50;
  display: block;
  overflow: auto;
  padding-bottom: 10px;
  /* position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */

    
}
.single{
  background: white;
}

.card{
        float:left; 
        width:215px;
        height:350px;
        position:relative;
        background-size: 100% 100%;
        bottom: 50%;
        padding: 0px 15px;
        word-wrap: normal;
     
}
.hand-area figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.hand-area figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
     opacity: 50%;
}
.button {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
  width: 15%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}

.button:hover{
  background-color: #45a049;
     font-family: 'Courier New';
}

</style>