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
import {formatDistanceToNow} from 'date-fns'

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
  console.log(documentId)
  let collection = 'games'
  let subCollection = 'players'

  const { documents, error} =  getSubCollection(collection, documentId, subCollection)
  const { document, err} =  getDocument(collection, documentId)

  // let showResult = () =>{
  //       let data = {
  //         playersJoined: document.value.playersJoined
  //       }
  //   console.log("Players Joined:"+ data.playersJoined)
  //     }

  //     showResult()

  let getPlayerIds = () => {
        let playerIds = []
        // let objects = {
        //   obj1: documents.value[0],
        //   obj2: documents.value[1],
        //   obj3:documents.value[2]
        // }
       //let docs = documents
        //console.log(objects.obj1)

      

        //  for(let doc in documents){
        //    console.log(documents[doc])
        //  }
              
          
       
        
      //  for (let doc in docs){
      //    console.log(docs)
        //   for(let i=0; i < 3; i++){
        //     console.log("Length: " + doc.length)
        //     playerIds.push(documents[doc][i].id)
        //     console.log("IDS: " + documents[doc][i].id)
        //  }
         return playerIds
     
  }

  getPlayerIds()
  
    
     let distributeCards = async () => {
      
      console.log("DISTRIBUTING CARDS")
       shuffledCards.value.forEach(card => {console.log(card.id)})

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

   //for (let i=0; i < cardDistribution; i++){
        let cardIds = cardGenerator()
         for (let x=0; x < cardDistribution; x++){
         subRef.doc('mO3ght1muEI9CzWo1kGZ').collection('cards').add(cardIds[x])
        }
    // }
  }

      watch(document, async () => {
       let data = {
          playersJoined: document.value.playersJoined,
          totalPlayers: document.value.totalPlayers
        }
      //if(data.playersJoined === data.totalPlayers) {
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