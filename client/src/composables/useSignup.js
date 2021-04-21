/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//This composable registers a new user.
import { ref } from "vue"
import { projectAuth } from '../firebase/config'

const error = ref(null)
const signup = async (email, password, displayName) => {
 error.value = null
 try{
   const res = await projectAuth.createUserWithEmailAndPassword(email,password)
   if(!res){
       throw new Error('Could not create new account')
   }
   await res.user.updateProfile({displayName})
   error.value = null
}catch(err){
   console.log(err.message)
   error.value = err.message
 }
}

const useSignup = () =>{
  return {error, signup}
}

export default useSignup