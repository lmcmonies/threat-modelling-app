<template>
  <div class="welcome container">
    <div v-if="showLogin">
      <h1>Login</h1>
      <LoginForm @login="enterChat"/>
      <!-- <p>No account yet? <span @click="showLogin = false">Signup</span> instead.</p> -->
    </div>
    <!-- <div v-else>
      <h1>Sign up</h1>
      <SignupForm @signup="enterChat"/>
      <p>Already registered? <span @click="showLogin = true">Login</span> instead.</p>
    </div> -->
  </div>
</template>

<script>
import SignupForm from '../components/RegisterForm.vue'
import LoginForm from '../components/LoginForm.vue'
import {useRouter} from 'vue-router'
import { ref } from 'vue'

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true)
    const router = useRouter()

    const enterChat = () => {
      router.push({name: 'create'})
    }
    return { showLogin, enterChat }
  }
}
</script>

<style scoped>
  .welcome {
    
  

    font-family: 'Courier New';
    text-align: center;
    padding: 20px 0;
    /* border: 1px solid #45a049; */
    width: 30%;
     position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .welcome button {
    margin: 20px auto;
  }
</style>