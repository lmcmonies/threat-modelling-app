<template>
  <div class="container">
    <Navbar />
    <!-- <button class="button" @click="shuffle">Shuffle Cards</button> -->
     <!-- <button class="button" @click="distribute">Distribute Cards</button> -->
  
     <div v-if="document.currentTurn.playerId === pid">
       <h1>Your Turn</h1>
          </div>
     <div class="timer"><h1>Timer: {{timerVal}}</h1></div>
     <div class="poll"><h1>Is It A Valid Threat? </h1>
     <button class="button" @click="pollYes">Yes</button>
     <button class="button2" @click="pollNo">No</button>
     </div>
  
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
        let playerIds = []
    for(let i=0; i < documents.value.length; i++){
      if(playerIds[i] !== documents.value[i].id){
      playerIds.push(documents.value[i])
      }
    }
    if(playerIds.length === document.value.totalPlayers){
     for(let x=0; x< playerIds.length; x++){
 
      // console.log(playerIds[x])
       players.push(playerIds[x])
       //console.log(players[x])
     }
    }

    // for(let j=0; j< players.length; j++){
    //   if(players.length > document.value.totalPlayers){
    //   if(players[j].id === playerIds[j].id){
    //     players.splice(j)
    //   }
    //   }
    // }
 
    console.log("PLAYERS ADDED: " + players)
  })


//Manages Turns 
  watch(document, async() => {
    let doc = {
      occupied: document.value.playZoneOccupied,
      currentTurnIndex: document.value.currentTurn.index,
      currentTurnId: document.value.currentTurn.playerId,
      nextTurn: document.value.currentTurn.nextTurn,
      previousTurn: document.value.currentTurn.previousPlayerId,
      totalPlayers: document.value.totalPlayers,
      yes: document.value.poll.yes,
      no: document.value.poll.no
    }
    console.log("YES:" + doc.yes)
   console.log("PLAYERID: " + doc.currentTurnId)
    if(doc.currentTurnID === ""){
       gameRef.update({currentTurn: {playerId: players[0].id}})
    }

    //let playersPoints

  //  for(let i=0; i < players.length; i++){
  //    console.log("PLAYERS: " +  players)
  //           console.log("PLAYER ID: "  + players[i].id)
  //           console.log("CURRENT TURN PLAYER ID: " + doc.currentTurnId)
  //   if(players[i].id === doc.previousTurn){
  //       let player = {
  //             totalPoints: players[i].totalPoints
  //           }
  //           playersPoints = player
  //   }
  //  }

   
    
   //Updates Points Total Of Player Who PLayed Card
    if(doc.yes + doc.no === doc.totalPlayers){ // if total votes === total players
      if(doc.yes > doc.no){ //if yes is greater than no
         //loop through all players
         let playersPoints
          for(let i=0; i < players.length; i++){
            if(players[i].id === doc.previousTurn){
             let player = {
             totalPoints: players[i].totalPoints
          }
          playersPoints = player.totalPoints
        }
          }

      
      console.log("PLAYERS POINTS: " + playersPoints)
      subRef.doc(doc.previousTurn).update({totalPoints: playersPoints + 1})
      gameRef.update({ pollOpen: false, poll: {yes: 0, no: 0}})

      for(let v=0; v < players.length; v++){
        subRef.doc(players[v].id).update({pollSubmitted: false})
      }
    }
    }



   //Updates currentTurn
    if(doc.occupied){  //check to see if playzone is occupied. If there is a card in there.
   let decrementTimer = setInterval(() => { //Execute timer if playzone is occupied
     //console.log("PREVIOUS PLAYER ID INDEX: " + doc.nextTurn -1)
     if(timerVal.value === 0){   //if timer hits 0, 
         let turn 
         let index
       if(pid.value === doc.currentTurnId){  // if id of player === current turn id. Ensures only current turn person can play card
         if(doc.nextTurn !== doc.totalPlayers -1){ // if next turn index not equal to 3
          turn = doc.nextTurn + 1   // the next turn is incremented by 1. if nextTurn hits 3 it doesnt execute.
          index = doc.currentTurnIndex + 1 // index is incremented by 1
         }else{
           turn = 0  // This resets to the first document 
           index = -1
         }
        
        if(doc.nextTurn -1 !== -1){
        gameRef.update({playZoneOccupied: false, playZoneCardId: {}, pollOpen: true,
        currentTurn:{index:index, nextTurn: turn,playerId:players[doc.nextTurn].id, 
        previousPlayerId: players[doc.nextTurn -1].id}})
        }else{
          gameRef.update({playZoneOccupied: false, playZoneCardId: {}, pollOpen: true,
        currentTurn:{index:index, nextTurn: turn,playerId:players[doc.nextTurn].id, 
        previousPlayerId: players[doc.totalPlayers -1].id}})
        }
       }     
       clearInterval(decrementTimer)
       decrementTimerValue(10)
     }else{
       decrementTimerValue(timerVal.value -1)
     }
  },1000)
  }
  })

  let pollYes = async () => 
  {
    console.log("Poll Yes")
    let poll = 
    {
      yes:document.value.poll.yes,
      no: document.value.poll.no
    }
  
   for(let j=0; j < players.length; j++)
   {
     if(players[j].id === pid.value)
     {
        let player = 
        {
          pollSubbed: players[j].pollSubmitted
        }
       if(!player.pollSubbed)
        {
         await subRef.doc(pid.value).update({pollSubmitted: true})
         await gameRef.update({poll:{yes:poll.yes + 1, no: poll.no}})
        }
     }
    }
  }

  let pollNo = async () => {
    console.log("Poll No")
    let poll = {
      yes:document.value.poll.yes,
      no: document.value.poll.no
    }
   
   for(let j=0; j < players.length; j++)
   {
     if(players[j].id === pid.value)
     {
        let player = 
        {
          pollSubbed: players[j].pollSubmitted
        }
        console.log("PLAYER SUBBED: " + player.pollSubbed)
       if(!player.pollSubbed)
        {
          await subRef.doc(pid.value).update({pollSubmitted: true})
          await gameRef.update({poll:{no:poll.no + 1, yes: poll.yes}})
        }
     }
    }
  }


    // if the user value is ever null, redirect to welcome screen
    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'welcome' })
      }
    })

    return {shuffledCards, distribute, timerVal, document, error, documents, err, pid, pollYes, pollNo}
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

.button2 {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid red;
  width: 15%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}
.button2:hover{
  background-color: red;
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
   color: hotpink;
    margin-top: 10px;
 
   
}
.poll{
width: 40%;
display:inline-block;
}
</style>