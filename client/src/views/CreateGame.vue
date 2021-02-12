<template>

<SelectGame />
  
</template>

<script>
import SelectGame from "../components/SelectGame.vue";
import {projectFirestore, aUnion} from '../firebase/config'
import {ref} from 'vue'
export default {
     components: { SelectGame },
setup(){
   

    var docRef = projectFirestore.collection('games').doc('2X0kk3Wu4fzhv3N3dn2d');

    //  createGame(name) {
    //   const id = uuid();
    //   const newGame = { creator: this.user.name, name, id, board };
    //   database()
    //     .ref(`/games/${id}`)
    //     .set(newGame);
    //   this.activeGame = id;
    // },
    // joinGame(id) {
    //   this.activeGame = id;
    // }
    
}
}
</script>

<style>

</style>