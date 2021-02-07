<template>
  <div class="container">
    <Navbar />
    <ChatBox />
    <HandArea />
    <PlayZone />

      <div v-for="card in allCards" v-bind:key="card.id">
           <img class="card" :src="card.src" />
        </div> 
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import PlayZone from '../components/PlayZone.vue'
import HandArea from '../components/HandArea'
import ChatBox from '../components/ChatBox'
import getUser from '../composables/getUser'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import {useState, useGetters, useMutations} from '../composables/useStore'

export default {
  components: { Navbar, ChatBox, HandArea, PlayZone},
  setup() {
   const {allCards} = useGetters(['allCards'])
   
    const router = useRouter()
    const { user } = getUser()
    // if the user value is ever null, redirect to welcome screen
    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'Welcome' })
      }
    })

    return {allCards}
  }
}
</script>

<style>
</style>