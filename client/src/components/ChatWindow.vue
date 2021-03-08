<template>
<div class="chat-window">
    <div v-if="error">{{error}}</div>
    <div v-if="documents" class="messages">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
           <!-- <span class="name">{{doc.name}}</span> -->
            <span class="name">{{doc.name}}</span>
            <span class="message">{{doc.message}}</span>
        </div>
    </div>
</div>
</template>

<script>
import {formatDistanceToNow} from 'date-fns'
import getMessages from '../composables/getMessages'
import { computed, onUpdated, ref } from 'vue'
import {useRoute} from 'vue-router'

export default {
setup(){
     const route = useRoute()
     let gameId = route.params.id.toString()
     let subCollection = 'messages'
     let collection = 'games'
    const { error, documents } = getMessages(collection, gameId, subCollection)

    const formattedDocuments = computed(() => {
     if(documents.value){
         return documents.value.map(doc => {
            // let time = formatDistanceToNow(doc.createdAt.toDate())
             return {...doc, //createdAt: time
              }
         })
     }
    })

    //const messages = ref(null)

    // onUpdated(() => {
    //     messages.value.scrollTop = messages.value.scrollHeight
    // })

    return { error, documents, formattedDocuments, }
}
}
</script>

<style>
.chat-window{
     overflow-y: auto;
    overflow-x:hidden;
}
.name{
font-family: 'Courier New';
font-weight: bold;
margin-right: 6px;
margin-left: 10px;
}


</style>