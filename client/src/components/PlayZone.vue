<template>
  <div class='play-zone'>

    <!-- <div v-for="card in playZoneCard" v-bind:key="card.id">
            <figure><img class="card" :src="card.src"/></figure>
        </div>  -->
    

  </div>
</template>

<script>
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import { computed, onUpdated, ref, watch } from 'vue'
export default {
setup(){
   const {playZoneCard} = useGetters(['playZoneCard'])
  
   

   return{playZoneCard}
}
}
</script>

<style scoped>
.play-zone{

  height:100%;   
  width: 25%;
  font-family: 'Courier New';
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid hotpink;
  display: block;
  overflow: auto;
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
.play-zone figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.play-zone figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
     opacity: 50%;
}

.label{
     font-family: 'Courier New';
}
</style>