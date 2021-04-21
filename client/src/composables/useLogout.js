/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//This composable logs a user out of their account.
import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const error = ref(null)

// logout function
const logout = async () => {
  error.value = null

  try {
    await projectAuth.signOut()
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
  }
}

const useLogout = () => {
  return { error, logout }
}

export default useLogout