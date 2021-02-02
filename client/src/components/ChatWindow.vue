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
import getCollection from '../composables/getCollection'
import { computed, onUpdated, ref } from 'vue'

export default {
setup(){
    const { error, documents } = getCollection('messages')

    const formattedDocuments = computed(() => {
     if(documents.value){
         return documents.value.map(doc => {
             let time = formatDistanceToNow(doc.createdAt.toDate())
             return {...doc, createdAt: time }
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