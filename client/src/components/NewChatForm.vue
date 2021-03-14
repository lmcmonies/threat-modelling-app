<template>
<div class="container">
  <form>
      <textarea
      placeholder="type a message..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit">
      </textarea>
      <div class="error">{{error}}</div>
  </form>
</div>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import useSubCollection from '../composables/useSubCollection'
import ChatWindow from '../components/ChatWindow.vue'
import {useRoute} from 'vue-router'
export default {
    components:{
     ChatWindow
    },
    setup(){
        
         const route = useRoute()
         let gameId = route.params.id.toString()
         let subCollection = 'messages'
         let collection = 'games'

        const { user } = getUser()
        const {addDoc, error} = useSubCollection(collection, gameId, subCollection)

        const message = ref('')

        const handleSubmit = async () => {
        const chat = { 
            name: user.value.displayName,
            message: message.value,
            createdAt: timestamp()
            }
            
            //Request to db to add new doc, 
            //Firebase triggers local snapshot. 
            await addDoc(chat)
            if(!error.value){
              message.value = ''
            }
           
        }
        return { message, handleSubmit }
    }

}
</script>

<style scoped>
form {
    margin:10px;
    
}

textarea {
    width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing:border-box;
    border: 0;
    border-radius: 8px;
    font-family: inherit;
    outline: none;
    resize: none;
    border: 2px solid hotpink;
    background-color: rgb(22, 22, 22);
    color: white;
}

</style>