<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->
<template>
<!-- The Cards for each player are retrieved from the database and displayed
using a for loop.
uupdatePlayZone() is a method that ensures when a card in the hand area is clicked 
the card is moved to the play zone if it's that players turn. -->
  <div class="handArea">
        <div v-for="card in pCards" v-bind:key="card.id">
           <figure><img class="card" :src="card.src" @click="updatePlayZone(card)"/></figure>
        </div> 
  </div>
</template>

<script>
import {useMutations, useActions} from '../composables/useStore'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import getUser from '../composables/getUser'
import getDocument from '../composables/getDocument'
import getSubCollection from '../composables/getSubCollection'
import getSubSubCollection from '../composables/getSubSubCollection'
import {computed, watch} from 'vue'
import {projectFirestore} from '../firebase/config'

export default {
    setup(){
  const { user } = getUser()

  const route = useRoute()

  //retrieves shuffled cards array from database.
  let shuffledCards = computed(() => store.state.shuffledCardsArray)
   
  let gameId = route.params.id.toString()

  var subRef = projectFirestore.collection('games').doc(gameId).collection('players')
  var gameRef = projectFirestore.collection('games').doc(gameId)

  const store = useStore()
  const {shuffleCards} = useMutations(['shuffleCards'])
  const {updatePlayerId} = useActions(['updatePlayerId'])
  const {updatePlayersCards} = useActions(['updatePlayersCards'])

  let documentId = route.params.id.toString()
  let collection = 'games'
  let subCollection = 'players'
  let subSubCollection = 'cards'

 

  //getDocument composable used to retrieve the relevant game from the database.
  const { document, err} =  getDocument(collection, documentId)

  //getSubCollection used to retrieve the relevant players for the game from the database. 
  const { documents, error} =  getSubCollection(collection, documentId, subCollection)
  
  //setTimeout() ensures that players id can be retrieved from the store and passed to composable
  //getSubSubCollection which retrieves a players cards. 
  const {cards, cardsError} = setTimeout(async () =>{ 
      let pid = computed(() => store.state.playerId ) 
       const {cards, cardsError} = await getSubSubCollection(collection, documentId, subCollection, pid.value,subSubCollection ) 
       watch(cards, async () => {
         let playersCards = []
       for(let i=0; i< cards.value.length; i++){
         playersCards.push(cards.value[i])
       }
       updatePlayersCards(playersCards)
       })
       return {cards, cardsError}
}, 300)

let pCards = computed(() => store.state.playersCards)

//global players array containing ids of all players in the game.
let players = []



//watching documents =  players for changes. Adds player to a playerIds array if they are not already in the array.
//checks player id to do this. 
  watch(documents, async () => {
        let playerIds = []
    for(let i=0; i < documents.value.length; i++){
      if(playerIds[i] !== documents.value[i].id){
      playerIds.push(documents.value[i])
      }
    }
   
   //once number of players in array is equal to number of players selected to play game
   //all players in playersIds array are pushed into a global players array
    if(playerIds.length === document.value.totalPlayers){
     for(let x=0; x< playerIds.length; x++){
       players.push(playerIds[x].id)
   
       //adds a players id to the vuex store which is used in the process of retrieving their cards.
       for(let i=0; i < documents.value.length; i++){
       if(user.value.email === documents.value[i].email){
         updatePlayerId(documents.value[i].id)
       }
       }
     }
    } 
  })

// distributes cards from shuffled cards array to each player in the game. 
 let distributeCards = () => {
      
     //retrieves total players in game
     let docData = {totalPlayers:document.value.totalPlayers}
     
     //holds total players value
     let totalPlayers = docData.totalPlayers

     // holds total number of cards
     let numOfCards =  shuffledCards.value.length
   
     // determines card distribution based on total num of players and cards.
     let cardDistribution = numOfCards / totalPlayers
     
     //min and max are the ids for the card sin the array. min starts at 0 and max at card distribution number
     //e.g 3 players in game, card distribution = 3
     let min = 0
     let max = cardDistribution
    
    //cardGenerator() called for each player in players array.
    //returns an array of cards based on the min and max values above.
    //the min and max values are updated so the next player recieves cards from further along 
    //in the cards array. 
    //Assuming 3 players  playing game -> player1: index 0-2, player2: index 3-5, player3: index 6-8 
    let cardGenerator = () => {
      let cardIds = []
      
      for(let i = min; i<max; i++)
      {
       cardIds.push(shuffledCards.value[i])
      }
       min += cardDistribution
       max += cardDistribution
       return cardIds
    } 

      // for each player, cardGenerator() called
      for (let i=0; i < players.length; i++){
        let cardIds = cardGenerator()
         for (let x=0; x < cardIds.length; x++){
          //for each player, for each card in array 
          //used player id to save their cards to database.
          subRef.doc(players[i]).collection('cards').add(cardIds[x])
        }
     }
     //update game to active once all players have cards. 
     gameRef.update({isGameActive: true})
 }

 //watching document = game for changes. 
  watch(document, async () => {
    //destructure game object held in document.
    let data = {
          playersJoined: document.value.playersJoined,
          totalPlayers: document.value.totalPlayers,
          gameActive: document.value.isGameActive
        }
 
     //if number of players joined equal to total players for the game
     if(data.playersJoined === data.totalPlayers){
       //if the game is not active
       if(!data.gameActive)
       {
       //shuffled the cards and then distribute them to each player. 
       shuffleCards()
       distributeCards()
       }
     }
    });
    
    //when a card is clicked in hand area, updatePlayZone() takes data from a card and 
    //sends it to the game document in the db so it can be displayed in the play zone. 
    let updatePlayZone = (card) => {
      let player = []

      //destructure game document
      let game = {
         occupied: document.value.playZoneOccupied,
         currentPlayer: document.value.currentTurn.playerId,
         pollOpen: document.value.pollOpen,
         cardNum: document.value.totalCards
      }

      //destructure card document
      let data = {
        id: card.id,
        src:card.src,
        cardId: card.cardId
      }

      //retrieve players id from vuex store
      let pid = computed(() => store.state.playerId )
      
      //for each player in players array
       for(let x=0; x < players.length; x++){
         //if ids match then push that players id into the local player array.
         if(pid.value === players[x]){
           player.push(players[x])
         }
       }

     //for each player in player array (there is only ever one at a time, the player who played a card)
      for(let i=0; i < player.length; i++){
        //if its that players turn, the play zone is not occupied, poll is not open and total cards left in game
        //is not 0
        if(player[i] === game.currentPlayer && game.occupied === false && game.pollOpen === false && game.cardNum !== 0)
         {
           //delete that card from the players hand area
          subRef.doc(player[i]).collection('cards').doc(data.cardId).delete().then(() => {
          }).catch((error) => {
           console.error("Error removing document: ", error);
          });
          //send the cards data to the game document, update play zone occupied to true and take one away from total cards 
          gameRef.update({playZoneCardId: data, playZoneOccupied: true, totalCards: game.cardNum -1})
         }
      }
    }

    return {document, documents, error, err, pCards, cardsError, updatePlayZone}
    }
}
</script>

<style scoped>
.handArea{
 background-color: rgb(22, 22, 22);
  height:50%;   
  width: 58%;
  font-family: 'Trebuchet MS';
  background-position: bottom;
  background-repeat: no-repeat;

  border-radius: 8px;
  border: 2px solid #4CAF50;
  display: block;
  overflow: auto;
  padding-bottom: 10px;
  margin-bottom: 10px;
  left: 0;    
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
.handArea figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.handArea figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
   
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