<template>
  <div>
    <section>
      <p>New Game</p>
      <input class="input" v-model="gameName" required placeholder="Enter Game Name" />
      <label class="label" for="players">Players:</label>
      <select name="players" v-model="numOfPlayers" id="players" required>
       <option class="option" value="3">3</option>
       <option class ="option" value="4">4</option>
       <option class="option" value="5">5</option>
       <option class="option" value="6">6</option>
     </select>
    <button class="button" @click="createGame">Create</button>
    </section>
 

    <section>
      <p>Join Game</p>
      <input class="input" v-model="gameId" placeholder="Enter Game ID" />
      <button class="button" v-on:click="joinGame">Join</button>
    </section>
  </div>
</template>

<script>
import {computed} from 'vue'
import uuid from "uuid";
import {projectFirestore, aUnion} from '../firebase/config'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {useStore} from 'vuex'

export default {
setup(){
 let gameName = ref("")
 let gameId =  ref("")
 let numOfPlayers = ref("")


  const router = useRouter()
  const store = useStore()

const gam = computed(() => store.state.gameId)
const {updateGameId} = useActions(['updateGameId'])

var docRef = projectFirestore.collection('games');

 const createGame = async () =>{
   let uid = uuid();
   let id = uid
   let newGame = {gameName: `${gameName.value}`, gameId: `${uid}`, numOfPlayers: `${numOfPlayers.value}`, 
   currentTurn: "", playZoneCardId: "", players: [] };
   updateGameId(id);
   await docRef.doc(id).set(newGame);
   router.push({name: 'chatroom', params:{id: id}})
 }

const joinGame = async () =>{
   router.push({name: 'chatroom', params:{id: gameId.value.toString()}})
 }

return {gameName, gameId, createGame, numOfPlayers, joinGame, updateGameId, gam}
}

};
</script>

<style scoped>
div {
  display: flex;
  
position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
p {
  font-family: 'Courier New';
  margin: 4px;
  text-align: center;
  font-size: 30px;
}
.label{
font-family: 'Courier New';
text-align: center;
font-size: 25px;

}


.input{
  font-family: 'Courier New';
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 35px;      
  line-height: 35px;
}
section {
  padding: 16px;
  background-color: whitesmoke;
  margin: 16px;

   width: 100%;
  height:50%;


}
#players{
  width:30%;
  font: inherit;
  margin-left: 40px;
  background: rgb(24, 24, 24);
}
.option{
  height:40px;
}
 .button {
  font-family: 'Courier New';
  font-size: 30px;
  text-align: center;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
  width: 100%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}
.button:hover{
  background-color: #45a049;
     font-family: 'Courier New';
}
</style>