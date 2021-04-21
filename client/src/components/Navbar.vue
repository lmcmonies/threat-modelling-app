<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->
  
<template>
 <!-- Navbar displays users name, provides a log out button and also a ready button which the user must click to 
   to get the game started.-->
  <nav v-if="user">
     <div class="title-container">
      <h1>Elevation of Privilege</h1>
      </div>
        <div>
      <p>Playing as {{ user.displayName }}</p>
    </div>
      
    <div>
       <div v-if="!isReady">
     <button  class="button" v-on:click="isReady=!isReady" v-bind:class="{isReady: isReady}" @click="readyToPlay">Ready?</button>
    </div>
       <div>
    </div>
    <button class="button" @click="handleLogout">Logout</button>
    </div>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import {projectFirestore, increment} from '../firebase/config'
import {ref} from 'vue'
import {useRoute} from 'vue-router'
export default {

  setup() {
    const { logout, error } = useLogout()
    const { user } = getUser()
    const isReady = ref(false)
    
    //user email used to create a document for them in the database. 
    let id = `${user.value.email}`
    
    //data for a new user.
     let data = 
     {
      email:id,
      totalPoints:0,
      ready: true,
      pollSubmitted: false
     }

     const route = useRoute()
     
     //retrieves game id from the URL
     let gameId = route.params.id.toString()
    
    var subRef = projectFirestore.collection('games').doc(gameId).collection('players')
    var docRef = projectFirestore.collection('games').doc(gameId)

    //logs user out. uses method logout() in useLogout composable. 
    const handleLogout = async () => {  
      await logout()
    }
    
    //updates 
    const readyToPlay = async () =>{
      //isReady updated to true. hides button after clicked. 
      isReady.value=true
      //data for user saved to database. 
      await subRef.add(data)
      //calls addOne() to increment playerJoined number in game document. 
      addOne()

    }
    
    //increment playerJoined number in game document. 
    const addOne = async () => {
      await docRef.update({playersJoined: increment})
    }
    return { handleLogout, user, readyToPlay, isReady}
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
    color: rgb(255, 255, 255);
    font-family: 'Courier New';
  }
  nav p.email {
    font-size: 14px;
    color: rgb(255, 255, 255);
  }
  .button {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: rgb(22, 22, 22); 
  color:white; 
  border: 2px solid #4CAF50;
  width: 100%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
  float: right;
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