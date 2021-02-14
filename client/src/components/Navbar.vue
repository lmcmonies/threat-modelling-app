
  
<template>
  <nav v-if="user">
    <div>
      <p>Playing as {{ user.displayName }}</p>
    

    </div>
     <div class="title-container">
      <h1>Elevation of Privilege</h1>
         <button class="button" @click="handleClick">Logout</button>
    
      </div>
      
  
     <button  v-on:click="isReady=!isReady" v-bind:class="{isReady: isReady}" @click="readyToPlay">Ready To Play?</button>
    
  </nav>
</template>

<script>
import {computed} from 'vue'
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import {projectFirestore, aUnion, increment} from '../firebase/config'
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
export default {
  setup() {
    const { logout, error } = useLogout()
    const { user } = getUser()
    const isReady = ref(false)
    //let id = `${user.value.email.split('@')[0]}`
    let id = `${user.value.email}`
     let data = 
     {
      email:id,
      totalPoints:0,
     }
 const route = useRoute()

  const store = useStore()
  //const {gameId} = useGetters(['getGameId'])

  let gameId = route.params.id.toString()
    
//let {gameId} = computed(() => store.state.gameId)
//console.log(gameId)

    var subRef = projectFirestore.collection('games').doc(gameId).collection('players')
    var docRef = projectFirestore.collection('games').doc(gameId)

        
    const handleClick = async () => {
      await logout()
    }

    const readyToPlay = async () =>{
      isReady.value=true
      console.log(isReady)
      await subRef.add(data)

     //await docRef.update({players: aUnion(data)})
    //  await docRef.update({[id]:
    //   {cards:[],
    //    totalPoints:0,
    //  }})

     addOne()

    }

    const addOne = async () => {
      await docRef.update({playersJoined: increment})
    }
    return { handleClick, user, readyToPlay, isReady}
  }
}
</script>

<style scoped>
  nav {
    font-family: 'Courier New';
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 20px;
    color: #444;
    font-family: 'Courier New';
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
  .button {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
  width: 10%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}
.button:hover{
  background-color: #45a049;
     font-family: 'Courier New';
}
.title-container{
     border: 2px solid #4CAF50;
     width: 30%;
     border-radius: 4px;
     position: absolute;
     text-align: center;
     left: 34%;
     right:34%;
   
  }
 
   .isReady{
     font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color:#4CAF50; 
  border: 2px solid #4CAF50;
  width: 10%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
 border: 2px solid #4CAF50;
  }


</style>