<template>
  <div class='play-zone'>

  </div>
</template>

<script>
export default {
data (){
    return{
     potentialPlay: []
    }
}
}
</script>

<style scoped>
.play-zone{

  height:100%;   
  width: 25%;
  font-family: 'Courier New';
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid hotpink;
  display: block;
  overflow: auto;
  position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    
}


.label{
     font-family: 'Courier New';
}
</style>