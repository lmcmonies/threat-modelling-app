<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->
<template>
<!-- The messages that are saved to the database are formatted and displayed using this code.
A for loop is used display the users name and message  -->
<div class="chat-window">
    <div v-if="error">{{error}}</div>
    <div v-if="documents" class="messages">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
            <span class="name">{{doc.name}}</span>
            <span class="message">{{doc.message}}</span>
        </div>
    </div>
</div>
</template>

<script>

import {computed} from 'vue'
import {useRoute} from 'vue-router'

import getMessages from '../composables/getMessages'
export default {
setup(){
     const route = useRoute()
     let gameId = route.params.id.toString()
     let subCollection = 'messages'
     let collection = 'games'
     //the getMessages composable is used to retrieve the messages from the database.  
    const { error, documents } = getMessages(collection, gameId, subCollection)

   //the documents retrieved from the database are formatted before being passed to the template
   // to be displayed to the user.
    const formattedDocuments = computed(() => {
     if(documents.value){
         return documents.value.map(doc => {
             return {...doc}
         })
     }
    })
    return { error, documents, formattedDocuments, }
 }
}
</script>

<style>
.chat-window{
     overflow-y: auto;
    overflow-x:hidden;
    background-color: rgb(22, 22, 22);
}
.name{
font-family: 'Courier New';
font-weight: bold;
margin-right: 6px;
margin-left: 10px;
}
</style>