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