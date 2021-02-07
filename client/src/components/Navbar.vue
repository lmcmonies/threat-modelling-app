
  
<template>
  <nav v-if="user">
    <div>
      <p>Playing as {{ user.displayName }}</p>

    </div>
     <div class="title-container">
      <h1>Elevation of Privilege</h1>
    
      </div>
    <button class="button" @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
export default {
  setup() {
    const { logout, error } = useLogout()
    const { user } = getUser()
    const handleClick = async () => {
      await logout()
    }
    return { handleClick, user }
  }
}
</script>

<style scoped>
  nav {
    font-family: 'Courier New';
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 20px;
    color: #444;
    font-family: 'Courier New';
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
  .button {
  font-family: 'Courier New';
  font-size: 30px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
  width: 10%;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
}
.button:hover{
  background-color: #45a049;
     font-family: 'Courier New';
}
.title-container{
     border: 2px solid #4CAF50;
     width: 30%;
     border-radius: 4px;
     position: fixed;
     text-align: center;
     left: 34%;
     right:34%;
   
  }

</style>