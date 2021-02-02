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
import useCollection from '../composables/useCollection'
import ChatWindow from '../components/ChatWindow.vue'

export default {
    components:{
     ChatWindow
    },
    setup(){
        

        const { user } = getUser()
        const {addDoc, error} = useCollection('messages')

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
}

</style>