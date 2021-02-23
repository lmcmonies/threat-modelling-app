<template>
  <div class="container">
    <Navbar />
    <!-- <button class="button" @click="shuffle">Shuffle Cards</button> -->
     <!-- <button class="button" @click="distribute">Distribute Cards</button> -->
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
import {useState, useGetters, useMutations} from '../composables/useStore'

export default {
  components: { Navbar, ChatBox, HandArea, PlayZone},
  setup() {
   const {shuffledCards} = useGetters(['shuffledCards'])
    const {shuffleCards} = useMutations(['shuffleCards'])
    const {distributeCards} = useMutations(['distributeCards'])

    const  distribute = () => distributeCards()
   
    const router = useRouter()
    const { user } = getUser()

     const route = useRoute()
     

  let document = route.params.id.toString()
  let collection = 'games'
    
  const { doc, error } = getDocument(collection, document)

   const fDoc = computed(() => {
      if(doc.value){
         return doc.value.map(doc => {
           console.log("FDOC: " + doc.gameId)
              return {...doc}
         
        })
     }
    })
    // if the user value is ever null, redirect to welcome screen
    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'welcome' })
      }
    })

    return {shuffledCards, distribute, fDoc}
  }
}
</script>

<style scoped>

.container{
   overflow-y: auto;
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
    height: 50%;
    width: 90%;
}
.play-zone{
   position: fixed;
    bottom: 0;
    height: 55%;
    width: 20%;
}
.chat-box{
 padding-top: 10px;
 margin-top: 10px;
}
</style>