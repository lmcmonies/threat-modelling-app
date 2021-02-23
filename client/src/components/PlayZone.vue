<template>
  <div class='play-zone'>

    <div v-for="c in card" v-bind:key="c.id">
            <figure><img class="card" :src="c.src"/></figure>
        </div> 
    

  </div>
</template>

<script>
import {useState, useGetters, useMutations, useActions} from '../composables/useStore'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import getUser from '../composables/getUser'
import getDocument from '../composables/getDocument'
import getSubCollection from '../composables/getSubCollection'
import getSubSubCollection from '../composables/getSubSubCollection'
import { computed, onUpdated, ref, watch } from 'vue'
import {projectFirestore, aUnion, timestamp} from '../firebase/config'
export default {
setup(){
      const route = useRoute()
  // let gameId = route.params.id.toString()
 
   //var gameRef = projectFirestore.collection('games').doc(gameId)
     let documentId = route.params.id.toString()
  let collection = 'games'

   //games
  const { document, err} =  getDocument(collection, documentId)

  let card = ref(null)
  watch(document, async () => {
    let result = []
  let data = {
    playZoneCardId: document.value.playZoneCardId
  }

  let subData = {
    id: data.playZoneCardId.id,
    src: data.playZoneCardId.src
  }

  result.push(subData)
  
   card.value = result

  console.log(subData.src)

  })

   return{document, err, card}
}
}
</script>

<style scoped>
.play-zone{

  height:30%;   
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