<template>
  <div class="hand-area">
       
      <!-- <div v-for="card in playersCardsArray" v-bind:key="card.id">
            <figure><img class="card" :src="card.src" @click="transferCard(card)" /></figure>
           
      </div> -->
   
        <div v-for="card in cards" v-bind:key="card.id">
            <figure><img class="card" :src="card.src" @click="updatePlayZone(card)"/></figure>
        </div> 
  
  </div>
</template>

<script>
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
    setup(){

        //  const {getCards} = useGetters(['playersCards'])
        //   const  cards = () => getCards()
        
          const store = useStore()
          const cards = computed(() => store.state.players[0].cards)

            const {updatePlayZone} = useActions(['updatePlayZone'])

           

        //   function transferCard(card){
        //     store.state.players[0].playZone.push(card)
        //   }
        
            return {updatePlayZone, cards}

            
    }
    // props:['playersCardsArray'],
    // data(){
    //     return{
    //      clickedCard: []
    //     }
    // },
    // components:{
        
    // },
    // methods: {
    //     transferCard(card){
    //         this.clickedCard.push(card);
    //     }
    // }
   


}
</script>

<style scoped>
.hand-area{

  height:50%;   
  width: 90%;
  font-family: 'Trebuchet MS';
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #4CAF50;
  display: block;
  overflow: auto;
  padding-bottom: 10px;
  position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    
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
.hand-area figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.hand-area figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
     opacity: 50%;
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