<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->
<template>
  <!-- Displays card in play zone -->
  <div class='playZone'>
    <div v-for="c in card" v-bind:key="c.id">
      <div v-if="c.id !== undefined">
            <figure><img class="card" :src="c.src"/></figure>
      </div>
    </div> 
  </div>
</template>

<script>

import {useRoute} from 'vue-router'
import getDocument from '../composables/getDocument'
import {ref, watch} from 'vue'
export default {

setup(){
  const route = useRoute()

  let documentId = route.params.id.toString()
  let collection = 'games'

  //retrieves game document
  const { document, err} =  getDocument(collection, documentId)
  
  let card = ref(null)
  
  //watching game document for changes. 
  watch(document, async () => {
  let result = []
  //game document destructured. play zone card pulled out. 
  let data = {
    playZoneCardId: document.value.playZoneCardId
  }
  
  //playzone card object destructured further to retrieve id and src.
  let subData = {
    id: data.playZoneCardId.id,
    src: data.playZoneCardId.src
  }
  
  //push card data onto array
  result.push(subData)
  
  //add card data held in array to card ref for use by template to display card. 
  card.value = result
  })
   return{document, err, card}
}
}
</script>

<style scoped>
.playZone{

  height:50%;   
  width: 29.5%;
  font-family: 'Courier New';
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: rgb(22, 22, 22);
  border-radius: 8px;
  border: 2px solid hotpink;
  display: block;
  overflow: auto;
  position: absolute;
  right: 0; 
  margin-right: 10px;   
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

.playZone figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.playZone figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.label{
  font-family: 'Courier New';
}
</style>