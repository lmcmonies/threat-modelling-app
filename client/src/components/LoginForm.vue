<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button class="button">Log in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
import {projectFirestore, aUnion} from '../firebase/config'

export default {
  setup(props, context) {
    // refs
    const email = ref('')
    const password = ref('')

      //let data =
          // {username:{cards:[],totalPoints:0, isReady: false}}

    // let data = ["12345678"]
   // var docRef = projectFirestore.collection('games').doc('2X0kk3Wu4fzhv3N3dn2d');
        
    const { error, login } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
    //  await docRef.update({players: aUnion(data)})

      if (!error.value) {
        console.log('user logged in')
        context.emit('login')
      }
    }
    return { email, password, handleSubmit, error}
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