<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->
<template>
<div class="chatbox">
  <!-- This chat box component provides a container for two other components: 
  The chat window where messages are displayed.
  The chat form where users can type a message and submit it. -->
  <ChatWindow/>
  <NewChatForm/>
</div>
</template>

<script>
import NewChatForm from '../components/NewChatForm.vue'
import ChatWindow from '../components/ChatWindow.vue'
export default {
    components:{
        NewChatForm, ChatWindow
    }

}
</script>

<style>

.chatbox{
    background-color: rgb(22, 22, 22);
    border-radius: 4px;
    border: 2px solid cyan;
    width: 30%;
    float: right;
    overflow-y: auto;
    overflow-x:hidden;
    max-height: 20vh;
}

</style>