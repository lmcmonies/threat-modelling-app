/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//This composable is used to log a user in to their account.
import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null)

const login = async (email, password) => {
  error.value = null

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    console.log(res)
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login details'
  }
}

const useLogin = () => {
  return { error, login };
}

export default useLogin
