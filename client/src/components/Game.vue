<template>
<div class="game">
    <div class="title">
      <br>
        <!-- <div v-for="card in allCards" v-bind:key="card.id">
           <img class="card" :src="card.src" />
        </div> -->
      <br>
      <button class="btn" @click="sendCards">Send Cards</button>
    </div>
        <play-zone>PlayZone</play-zone>
           <chat></chat>
         <hand-area v-bind:playersCardsArray='playersCardsArray'></hand-area> 
         <br>
         <br>

   </div>
   
   
</template>

<script>

import {mapGetters} from 'vuex';
import HandArea from './HandArea';
import PlayZone from './PlayZone.vue';


    export default 
    {
        name: 'Game',
        computed: mapGetters(['allCards']),
        components: 
        {
            'hand-area': HandArea,
            'play-zone': PlayZone,
         },
        data: function () {
            return {
            // allCardsArray: 
            //  [
            //    {id: 1, src: require('../assets/EoPCards/Suits/DenialofService/2DenialofService.png')},
            //    {id: 2, src: require('../assets/EoPCards/Suits/DenialofService/3DenialofService.png')}
            //  ],
             playersCardsArray:[],
             players : []
            }
        },
            methods: {
                sendCards: function (event) 
                {
                  event.preventDefault();
                  socket.emit('sendCards', this.allCards);
                }
            },
            created: function () {
             
                
       
            }
            }
            
</script>

<style scoped>
  .game{
  position: absolute;
  height:100%;   
  width: 100%;
  font-family: 'Courier New';
  background-position: center;
  background-repeat: no-repeat;
  background-color: #181818;
  background-size: cover;
    overflow: auto;
  }
  .title-container{
     border: 2px solid #4CAF50;
     width: 30%;
     border-radius: 8px;
     position: relative;
    
     left: 34%;
     right:34%;
   
  }

  .title{
      font-family: 'Courier New';
      color: #4CAF50;
      text-align:center;
      
  }
  .h1{
    font-weight:normal;
  }
  .card{
        float:left; 
        width:300px;
        height:450px;
        object-fit: cover;   
}
.btn{
  background-color: rgb(20, 20, 20);
  border: 2px solid #4CAF50;
  border-radius: 8px;
  font-family: 'Courier New';
  font-size: 20px;
   position: relative;
    
     top: 20%;
     text-align: center;
   
}
</style>