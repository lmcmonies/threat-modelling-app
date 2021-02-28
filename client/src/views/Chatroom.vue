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
    
    const { document, error } = getDocument(collection, documentId)
      var gameRef = projectFirestore.collection('games').doc(documentId)

   const {shuffledCards} = useGetters(['shuffledCards'])
    const {shuffleCards} = useMutations(['shuffleCards'])
    const {distributeCards} = useMutations(['distributeCards'])

    const  distribute = () => distributeCards()
   
 
   

       let timerVal = computed(() => store.state.timerValue) 
       const {decrementTimerValue} = useActions(['decrementTimerValue'])
     
  

  watch(document, async() => {
    let doc = {
      occupied: document.value.playZoneOccupied,
      timerValue: document.value.timerValue
    }
    console.log(doc.occupied)
    if(doc.occupied){
   let decrementTimer = setInterval(() => {
     if(timerVal.value === 0){
       gameRef.update({playZoneOccupied: false, playZoneCardId: {}})
       gameRef.update({currentTurn: increment})
       clearInterval(decrementTimer)
       decrementTimerValue(30)
     }else{
       decrementTimerValue(timerVal.value -1)
     
       //console.log("CHATROOM TIMER VAL: " + doc.timerValue-1)
     }
  },1000)
  }
  })
 

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

    return {shuffledCards, distribute, timerVal, document, error}
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