<template>
  <div class="container">
    <Navbar />
    <!-- <button class="button" @click="shuffle">Shuffle Cards</button> -->
     <!-- <button class="button" @click="distribute">Distribute Cards</button> -->
     <div class="timer"><h1>Timer: {{timerVal}}</h1></div>
    <ChatBox class="chat-box"/>
    <PlayZone class="play-zone" />
     <HandArea class="hand-area"/>
  
       <!-- <div v-for="card in shuffledCards" v-bind:key="card.id">
           <img class="card" :src="card.src" />
        </div>  
     -->
  </div>
</template>
 
<script>
import Navbar from '../components/Navbar.vue'
import PlayZone from '../components/PlayZone.vue'
import HandArea from '../components/HandArea'
import ChatBox from '../components/ChatBox'
import getUser from '../composables/getUser'
import getSubCollection from '../composables/getSubCollection'
import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import getDocument from '../composables/getDocument'
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {projectFirestore, increment} from '../firebase/config'

export default {
  components: { Navbar, ChatBox, HandArea, PlayZone},
  setup() {
     const router = useRouter()
    const { user } = getUser()
      const store = useStore()
      const route = useRoute()

     let documentId= route.params.id.toString()
     let collection = 'games'
       let subCollection = 'players'
    
    const { document, error } = getDocument(collection, documentId)
    //players
    const { documents, err} =  getSubCollection(collection, documentId, subCollection)

      var gameRef = projectFirestore.collection('games').doc(documentId)
       var subRef = projectFirestore.collection('games').doc(documentId).collection('players')

   const {shuffledCards} = useGetters(['shuffledCards'])
    const {shuffleCards} = useMutations(['shuffleCards'])
    const {distributeCards} = useMutations(['distributeCards'])

    const  distribute = () => distributeCards()
   
    let pid = computed(() => store.state.playerId ) 
   

       let timerVal = computed(() => store.state.timerValue) 
       const {decrementTimerValue} = useActions(['decrementTimerValue'])
     let players = []
  //watching players
  watch(documents, async () => {
    //console.log("PLAYERS")
        let playerIds = []
    for(let i=0; i < documents.value.length; i++){
      if(playerIds[i] !== documents.value[i].id){
      playerIds.push(documents.value[i])
      }
    }
    //console.log(playerIds)
    if(playerIds.length === document.value.totalPlayers){
     for(let x=0; x< playerIds.length; x++){
       players.push(playerIds[x])
       //console.log("Players Array: " + players[x].id)
     }
    }
  })

//let nextTurn = 0

  watch(document, async() => {
    let doc = {
      occupied: document.value.playZoneOccupied,
      currentTurnIndex: document.value.currentTurn.index,
      currentTurnId: document.value.currentTurn.playerId,
      nextTurn: document.value.currentTurn.nextTurn,
      totalPlayers: document.value.totalPlayers
    }
    
    // for(let j=0; j< players.length; j++){
    //   if(doc.currentTurnIndex === j){
    //      gameRef.update({currentTurn:{playerId:players[j].id}})
    //   }
    // }
    //nextTurn = doc.currentTurnIndex + 1
    console.log("CURRENT TURN INDEX: " + doc.currentTurnIndex)
    console.log("NEXT TURN: " + doc.nextTurn)
    if(doc.occupied){
   let decrementTimer = setInterval(() => {
     if(timerVal.value === 0){
       //for(let i=0; i < players.length; i++){
         let turn 
         let index
       if(pid.value === doc.currentTurnId){
         if(doc.nextTurn !== doc.totalPlayers -1){
          turn = doc.nextTurn + 1
          index = doc.currentTurnIndex + 1
         }else{
           turn = 0
           index = -1
         }
         
        gameRef.update({playZoneOccupied: false, playZoneCardId: {}, 
        currentTurn:{index:index, nextTurn: turn,playerId:players[doc.nextTurn].id}})
      // }
       }     
       clearInterval(decrementTimer)
       decrementTimerValue(10)
         
     }else{
       decrementTimerValue(timerVal.value -1)
     
       //console.log("CHATROOM TIMER VAL: " + doc.timerValue-1)
     }
  },1000)
  }
    // if(pid === previousTurn){
    //     subRef.doc(players[previousTurn].id).update({turn: false})
    //   }
    // if(doc.currentTurnIndex === doc.totalPlayers){
    //       gameRef.update({currentTurn:{index:0, nextTurn:1, playerId: players[0].id}})
    //    }

    //    if(doc.nextTurn === doc.totalPlayers){
    //      gameRef.update({})
    //    }
  })



// for(let x=0; x < players.length; x++){
//   if(doc.currentTurn !== x){
//     subRef.doc(players[x].id).update({turn: false})
//   }
// }

 

  //  const fDoc = computed(() => {
  //     if(doc.value){
  //        return doc.value.map(doc => {
  //          console.log("FDOC: " + doc.gameId)
  //             return {...doc}
         
  //       })
  //    }
  //   })
    // if the user value is ever null, redirect to welcome screen
    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'welcome' })
      }
    })

    return {shuffledCards, distribute, timerVal, document, error, documents, err}
  }
}
</script>

<style scoped>

.container{
   overflow-y: auto;
    font-family: 'Courier New';
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
.hand-area{
   position: fixed;
   bottom: 0;
    height: 55%;
    width: 80%;
}
.play-zone{
   position: fixed;
   
    height: 52%;
    width: 21%;
}
.chat-box{
 padding-top: 10px;
 margin-top: 10px;
}

.timer{
   border: 2px solid #4CAF50;
   border-radius: 4px;
   width: 15%;
}
</style>