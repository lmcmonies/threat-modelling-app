<template>
<div class="container">
   <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <br>
    <div id="landing-header">
        <button class="button" @click="$router.push('welcome')">Threat Model</button>
    </div>
    
   
</div>
</template>

<script>
export default {
  name: "landing",
  components: {}
};
</script>

<style scoped>
.button{
  width:30%;
  font-size: 50px;
  border-radius: 4px;
  font-family: 'Courier New';
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}
.button:hover{
  font-size: 55px;
  font-family: 'Courier New';

  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  border: none;
}


  
  #landing-header {
    z-index: 1;
    position: relative;
    text-align: center;
    padding-top: 20%;
    
  }
  
  #landing-header h1 {
    color: #fff;
  }
  
  .slideshow { 
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .slideshow li { 
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 0;
    animation: imageAnimation 50s linear infinite; 
  }
  
  .slideshow li:nth-child(1) { 
    background-image: url('../assets/EoPCards/Miscellaneous/landing1.jpg');
  }
  .slideshow li:nth-child(2) { 
    background-image: url('../assets/EoPCards/Miscellaneous/landing2.jpg');
    animation-delay: 10s; 
  }
  .slideshow li:nth-child(3) { 
    background-image: url('../assets/EoPCards/Miscellaneous/landing3.jpg');
    animation-delay: 20s; 
  }
  .slideshow li:nth-child(4) { 
    background-image: url('../assets/EoPCards/Miscellaneous/landing4.jpg');
    animation-delay: 30s; 
  }
  .slideshow li:nth-child(5) { 
    background-image: url('../assets/EoPCards/Miscellaneous/landing5.jpg');
    animation-delay: 40s; 
  }
  
  @keyframes imageAnimation { 
    0% { 
      opacity: 0; 
      animation-timing-function: ease-in;
    }
    10% {
      opacity: 1;
      animation-timing-function: ease-out;
    }
    20% {
      opacity: 1
    }
    30% {
      opacity: 0
    }
  }
  
  /* Older browser support - .no-cssanimations class added by modernizr */
  .no-cssanimations .slideshow li {
      opacity: 1;
  }





</style>