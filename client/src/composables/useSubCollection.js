/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//This composable allows new documents to be added to a sub collection. 
//e.g. a new message document added to messages collection.
import {ref} from 'vue'
import {projectFirestore} from '../firebase/config'

const useCollection = (collection, gameId, subCollection) => {
    const error = ref(null)

    const addDoc = async (doc) => {
        error.value = null
        try{
           await projectFirestore.collection(collection).doc(gameId).collection(subCollection).add(doc)
        }catch(err){
         console.log(err.message)
         error.value = 'could not send document'
        }
    }

    return { error, addDoc }

}


export default useCollection