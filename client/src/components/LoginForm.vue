<!-- 
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
-->
<template>
<!-- Takes users details in login form and uses submitUser() to log them in. -->
  <form @submit.prevent="submitUser">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button class="button">Log in</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useLogin from '../composables/useLogin'

export default {
  setup(props, context) {
    // refs watching for user input
    const email = ref('')
    const password = ref('')
    
    //useLogin() composable used to log user in. 
    const { error, login } = useLogin()

   //calls useLogin() and passes user details to log them in. 
    const submitUser = async () => {
      await login(email.value, password.value)

      if (!error.value) {
        context.emit('login')
      }
    }
    return { email, password, submitUser, error}
  }
}
</script>

<style scoped>
.dashboard{
  font-family: 'Courier New';
  text-align: center;
  border-radius: 4px;
  background-color: #f2f2f2;
  padding: 50px;
  width:30%;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.h1{
 text-align: center;
}

input[type=email], select {
  font-family: 'Courier New';
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=password], select {
  font-family: 'Courier New';
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 4px;
}
.button {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
  width: 100%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}
.button:hover{
  background-color: #45a049;
   font-family: 'Courier New';
}
</style>