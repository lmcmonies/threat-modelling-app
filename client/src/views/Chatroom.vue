<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->

<!-- The main view for the application. Imports components such as navbar, chat messenger, playzone and hand area
-->
<template>
  <div class="container">
    <Navbar/>
    <ChatBox class="chat-box"/>
     <div v-if="document.currentTurn.playerId === pid && document.pollOpen === false && document.gameFinished === false">
       <h1 class="h1">Your Turn</h1>
          </div>
          <div v-if="document.gameFinished === true">
          <button class="button3" @click="determineWinner">Reveal Results</button>
          </div>
    <div v-for="win in winner" v-bind:key="win.id">
           <h1 >{{win.email + ": " + win.totalPoints + " points"}}</h1>
        </div>  
     <div v-if="document.pollOpen === false && document.gameFinished === false ">  
     <div class="timer"><h1><img class="stop-watch" src="../assets/stop-watch.png" alt="Stop Watch: ">{{timerVal}}</h1></div>
     </div>
     <div v-if="document.pollOpen === true">
     <div class="poll"><h1>Is It A Valid Threat? </h1>
     <button class="button" @click="pollYes">Yes</button>
     <button class="button2" @click="pollNo">No</button>
     </div>
     </div>
    <br>
    <br>
    <br>
    <br>
        <PlayZone/>
        <HandArea/>
  </div>
</template>
 
<script>
import Navbar from '../components/Navbar.vue'
import PlayZone from '../components/PlayZone.vue'
import HandArea from '../components/HandArea'
import ChatBox from '../components/ChatBox'
import getUser from '../composables/getUser'
import getSubCollection from '../composables/getSubCollection'
import { watch, computed, ref} from 'vue'
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

       let winner = ref(null)

     let documentId= route.params.id.toString()
     let collection = 'games'
       let subCollection = 'players'
    
    const { document, error } = getDocument(collection, documentId)

    //players
    const { documents, err} =  getSubCollection(collection, documentId, subCollection)

    var gameRef = projectFirestore.collection('games').doc(documentId)
    var subRef = projectFirestore.collection('games').doc(documentId).collection('players')

    const {shuffledCards} = useGetters(['shuffledCards'])
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
       players.push(playerIds[x])
     }
    }
  })


//Manages Turns. Game document being watched for changes. 
  watch(document, async() => {
    let doc = {
      occupied: document.value.playZoneOccupied,
      currentTurnIndex: document.value.currentTurn.index,
      currentTurnId: document.value.currentTurn.playerId,
      nextTurn: document.value.currentTurn.nextTurn,
      previousTurn: document.value.currentTurn.previousPlayerId,
      totalPlayers: document.value.totalPlayers,
      yes: document.value.poll.yes,
      no: document.value.poll.no,
      totalCards: document.value.totalCards,
      gameFinished: document.value.gameFinished
    }

   //Updates Points Total Of Player Who Played Card
    if(doc.yes + doc.no === doc.totalPlayers){ // if total votes === total players
       if(pid.value === doc.previousTurn){
        if(doc.yes > doc.no){ //if yes is greater than no
          subRef.doc(pid.value).update({totalPoints:increment})
          gameRef.update({pollOpen: false, poll: {yes: 0, no: 0}})
        }else{
          gameRef.update({pollOpen: false, poll: {yes: 0, no: 0}})
        }
     }

     for(let v=0; v < players.length; v++){
        subRef.doc(players[v].id).update({pollSubmitted: false})
      }
      players.splice(0,players.length)
   
      if(doc.totalCards === 0)
      gameRef.update({gameFinished:true})
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
       decrementTimerValue(45)
     }else{
       decrementTimerValue(timerVal.value -1)
     }
  },1000)
  }
  })

//retrieves points total for each player from database. 
  let determineWinner = async () =>{
    console.log("WINNER")
    let doc = {
      gameFinished: document.value.gameFinished
    }
      if(doc.gameFinished === true){
      let scores = []
      for(let u=0; u < players.length; u++){
        let data = {
          email:players[u].email,
          totalPoints: players[u].totalPoints,
          id:players[u].id
        }
        scores.push(data)
      }
      winner.value = scores
    }
  }

//if yes is clicked by user then a point is added to the yes total of the poll 
  let pollYes = async () => 
  {
    console.log("Poll Yes")
     let poll = 
     {
       yes:document.value.poll.yes,
       no: document.value.poll.no
     }
     let pollOpen = {
       open: document.value.pollOpen
     }
   let totalCards = {
       cards: document.value.totalCards
     }
     if(totalCards.cards !== -1){
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
         if(pollOpen.open){
         await gameRef.update({poll:{yes:poll.yes +1, no: poll.no}})
         players.splice(0,players.length)
            }
          }
       }
    }
  }
 }

//if no is clicked by user then a point is added to the no total of the poll 
  let pollNo = async () => {
    console.log("Poll No")
    let poll = {
       yes:document.value.poll.yes,
       no: document.value.poll.no
     }
    let pollOpen = {
       open: document.value.pollOpen
     }

     let totalCards = {
       cards: document.value.totalCards
     }


     if(totalCards.cards !== -1){
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
         if(pollOpen.open){
          await gameRef.update({poll:{no:poll.no + 1, yes: poll.yes}})
          players.splice(0,players.length)
             }
         }
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

    return {shuffledCards, distribute, timerVal, document, error, documents, err, pid, pollYes, pollNo, determineWinner, winner}
  }
}
</script>

<style scoped>
.h1{
  font-family: 'Courier New';
}

.container{
  overflow-y: auto;
  font-family: 'Courier New';
  background-color: rgb(22, 22, 22);
  color: white;
}

 .button {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: rgb(22, 22, 22);
  color: white;
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
  background-color: rgb(22, 22, 22);
  color: white;
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
.button3 {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid hotpink;
  width: 15%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}
.button3:hover{
  background-color:hotpink;
  font-family: 'Courier New';
}
.hand-area{
   position: fixed;
   bottom: 0;
   height: 100%;
   width: 58%;
}
.play-zone{
   position: fixed;
   bottom: 0;
   height: 100%;
   width: 21%;
}
.chat-box{
 padding-top: 10px;
 margin-top: 10px;
}

.timer{
   border: 2px solid cyan;
   border-radius: 4px;
   width: 10%;
   color: hotpink;
   margin-top: 10px;  
}

.poll{
width: 40%;
display:inline-block;
}

.stop-watch{
 height: 70px;
}
</style>