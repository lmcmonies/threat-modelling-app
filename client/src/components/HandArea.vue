<template>
  <div class="hand-area">
      <!-- <div v-for="card in playersCardsArray" v-bind:key="card.id">
            <figure><img class="card" :src="card.src" @click="transferCard(card)" /></figure>
           
      </div> -->
      <!-- <button class="button" @click="showResult">Show Result</button>  -->
        <div v-for="card in pCards" v-bind:key="card.id">
           <figure><img class="card" :src="card.src" @click="updatePlayZone(card)"/></figure>

        </div> 
      <!-- <div v-for="doc in documents" :key="doc.id" class="single">
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

export default {
    setup(){
       const { user } = getUser()

  const route = useRoute()
    let shuffledCards = computed(() => store.state.shuffledCardsArray)
   

//console.log("ID" + playerId.value)
  
  let gameId = route.params.id.toString()

  var subRef = projectFirestore.collection('games').doc(gameId).collection('players')
  var gameRef = projectFirestore.collection('games').doc(gameId)

  const store = useStore()
  const {shuffleCards} = useMutations(['shuffleCards'])
  const {updatePlayerId} = useActions(['updatePlayerId'])
  const {updatePlayersCards} = useActions(['updatePlayersCards'])

  let documentId = route.params.id.toString()
  let collection = 'games'
  let subCollection = 'players'
  let subSubCollection = 'cards'
  //let subDocId =  playerId //'8uHhFCmAvv4Tb6EVTD8T'

 

  //games
  const { document, err} =  getDocument(collection, documentId)

  //players
  const { documents, error} =  getSubCollection(collection, documentId, subCollection)

  const {cards, cardsError} = setTimeout(async () =>{ 
      let pid = computed(() => store.state.playerId ) 
       console.log("RETRIEVING PID: " + pid.value)
       const {cards, cardsError} = await getSubSubCollection(collection, documentId, subCollection, pid.value,subSubCollection ) 
       
       watch(cards, async () => {
         let playersCards = []
       for(let i=0; i< cards.value.length; i++){
         playersCards.push(cards.value[i])
         console.log("CARD: " + cards.value[i].id)
       }
       updatePlayersCards(playersCards)
       })
       return {cards, cardsError}
}, 300)

let pCards = computed(() => store.state.playersCards)

let players = []



  watch(documents, async () => {
    console.log("PLAYERS")
        let playerIds = []
    for(let i=0; i < documents.value.length; i++){
      if(playerIds[i] !== documents.value[i].id){
      playerIds.push(documents.value[i])
      }
    }
    console.log(playerIds)
    if(playerIds.length === document.value.totalPlayers){
     for(let x=0; x< playerIds.length; x++){
       players.push(playerIds[x])
       console.log("Players Array: " + players[x].id)

       for(let i=0; i < documents.value.length; i++){
       if(user.value.email === documents.value[i].email){
         updatePlayerId(documents.value[i].id)
       }
       }
     }
    }
  })

 let distributeCards = () => {
      
      //console.log("DISTRIBUTING CARDS")
      // shuffledCards.value.forEach(card => {console.log(card.id)})

     let docData = {totalPlayers:document.value.totalPlayers}

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
         console.log("Min: " + min)
          console.log("Max: " + max)
      
      for(let i = min; i<max; i++)
      {
       console.log("Card ID: " + shuffledCards.value[i].id)
       cardIds.push(shuffledCards.value[i])
      }

       min += cardDistribution
       max += cardDistribution
       return cardIds
    } 


   for (let i=0; i < players.length; i++){
        let cardIds = cardGenerator()
         for (let x=0; x < cardDistribution; x++){
          subRef.doc(players[i]).collection('cards').add(cardIds[x])
        }
     }
     gameRef.update({isGameActive: true})
 }

  watch(document, async () => {
    console.log("GAME")
 
       let data = {
          playersJoined: document.value.playersJoined,
          totalPlayers: document.value.totalPlayers,
          gameActive: document.value.isGameActive
        }
     if(data.playersJoined === data.totalPlayers){
      if(!data.gameActive){
      shuffleCards()
      distributeCards()
       
      
       }
     }
    });

    let updatePlayZone = (card) => {

      let player = []
      let playZone = {
        occupied: document.value.playZoneOccupied
      }
      let data = {
        id: card.id,
        src:card.src
      }
      let pid = computed(() => store.state.playerId ) 
       for(let x=0; x < players.length; x++){
         console.log("PLAYERS: " + players[x].turn)
         console.log(pid.value)
         if(pid.value === players[x].id){
           console.log("PID: " + pid.value + "ID: " + players[x].id)
           player.push(players[x])
         }
       }
    console.log("Updating Play Zone")
    for(let i=0; i < player.length; i++){
      if(player[i].turn && !playZone.occupied){
        console.log(player[i].turn)
          gameRef.update({playZoneCardId: data})
          gameRef.update({playZoneOccupied: true})
      }
    }
    }


// watch(cards, async () => {
//   console.log("CARDS")
//   let cardsArray = await retrieveCards()
//   for(let x=0; x < cardsArray.length; x++){
//     console.log("CardID: " + cardsArray[x].id)
//     console.log("CARD SRC: " + cardsArray[x].src)
//   }
// })



//     let retrieveCards = async () => {
//       let cardsArray = []
//       for(let i=0; i < documents.value.length; i++){
//       if(user.value.email === documents.value[i].email){
//         for(let x=0; x < cards.value.length; x++){
//           cardsArray.push(cards.value[x])
//           //console.log(cards.value[x].id)
         
//         }
//       }
//     }
//     return cardsArray

//     }

    return {document, documents, error, err, pCards, cardsError, updatePlayZone}
            
    
    }
}
</script>

<style scoped>
.hand-area{

  height:70%;   
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
  margin-bottom: 10px;
  position: relative;
    top: 100%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    
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