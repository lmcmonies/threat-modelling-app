<template>
  <div class="hand-area">
      <!-- <div v-for="card in playersCardsArray" v-bind:key="card.id">
            <figure><img class="card" :src="card.src" @click="transferCard(card)" /></figure>
           
      </div> -->
      <!-- <button class="button" @click="showResult">Show Result</button>  -->
        <!-- <div v-for="card in cards" v-bind:key="card.id">
           <figure><img class="card" :src="card.src" @click="updatePlayZone(card)"/></figure>
        </div>  -->
      <div v-for="doc in documents" :key="doc.id" class="single">
            <span class="playersJoined">{{doc.email}}</span>
            <span class="totalPLayers">{{doc.id}}</span>
        </div> 
  
  </div>
</template>

<script>
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import getDocument from '../composables/getDocument'
import getSubCollection from '../composables/getSubCollection'
import { computed, onUpdated, ref, watch } from 'vue'
import {projectFirestore, aUnion, timestamp} from '../firebase/config'

export default {
    setup(){

  const route = useRoute()
    let shuffledCards = computed(() => store.state.shuffledCardsArray)
  
  let gameId = route.params.id.toString()

  var subRef = projectFirestore.collection('games').doc(gameId).collection('players')


  const store = useStore()
  const {shuffleCards} = useMutations(['shuffleCards'])
  //const {shuffledCardsArray} = useGetters(['shuffledCard'])

  let documentId = route.params.id.toString()
  let collection = 'games'
  let subCollection = 'players'

  const { documents, error} =  getSubCollection(collection, documentId, subCollection)
  const { document, err} =  getDocument(collection, documentId)

  // let getPlayerIds = () => {
  //       let playerIds = []
  //      for (let doc in documents){
  //        let data={
  //        id: doc.id
  //        }
  //        playerIds.push(data)
  //        console.log("DATA: "+ data.id)
  //      }

  //     for(let id in playerIds){
  //       console.log("Player Id: "+id.id)
  //     }

  //      return playerIds
  //    }
    for (let doc in documents){
      let data = {
       id: doc.id,
       email: doc.email,
       totalPoints: doc.totalPoints
     }
    console.log("DOCUMENTS" + data)
    }
    
    
     let distributeCards = async () => {
  
  
    
     
      // playerIds.forEach(player => {console.log("Player Id:" + player.id)})
      
      console.log("DISTRIBUTING CARDS")
       shuffledCards.value.forEach(card => {console.log(card.id)})

     let docData = {totalPlayers:document.value.totalPlayers}

     let totalPlayers = docData.totalPlayers
     console.log("Total Players: " + totalPlayers)
     let numOfCards =  shuffledCards.value.length
     console.log("Shuffled Cards Length: "+ shuffledCards.value.length)

     let cardDistribution = numOfCards / totalPlayers
     console.log("Card Distribution: " + cardDistribution)
     let min = 0
     let max = cardDistribution
    
    let cardGenerator = () => {
        let cardIds = []
         console.log("Min: " + min)
          console.log("Max: " + max)
      for(let i = min; i<max; i++){
       console.log("Card ID: " + shuffledCards.value[i].id)
      cardIds.push(shuffledCards.value[i])
      }
       min += cardDistribution
       max += cardDistribution
       return cardIds
    }

    //  //for(let doc in documents){
    //   for (let x=0; x < cardDistribution; x++){
    //     let cardIds = cardGenerator()
    //    // for(let doc in documents){
    //      subRef.doc(doc.id).collection('cards').add(cardIds[x])
    //     //}
    //     }
    //    }

      
       
    
      //}
    
    //  console.log("CARD IDS Length: " +  cardIds.length)
     
    //  cardIds.forEach(card => {
    //    console.log(card.id)
    //  })

    //  for (let i=0; i < docData; i++){
        
    //     console.log(cardIds.value.length)
    //     console.log("HEY")
    //     min += cardDistribution
    //     max += cardDistribution
    //     for (let x=0; x < cardIds.length; x++){
    //      subRef.doc(documents[i]).update({cards: cardIds[x].value.id})
    //      console.log("Card ID:" + cardIds[x].value.id)
    //   }
    //   }
     }

      watch(document, async () => {
       let data = {
          playersJoined: document.value.playersJoined,
          totalPlayers: document.value.totalPlayers
        }
     // if(data.playersJoined === data.totalPlayers) {
      shuffleCards()
     await distributeCards()
   // }
    });

    
     

    return {document, documents, error, err}
            
    }
}
</script>

<style scoped>
.hand-area{

  height:50%;   
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
  position: relative;
    top: 50%;
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