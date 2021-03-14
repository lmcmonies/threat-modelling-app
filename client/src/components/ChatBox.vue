<template>
<div class="chatbox">
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