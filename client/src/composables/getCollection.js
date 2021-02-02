import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')
    
    // onSnapshot() - real time listener for DB
    //A document is added, changed, deleted
    //then user gets sent a snapshot.
    //Contains all docs and data at that moment in time
    const unsub =  collectionRef.onSnapshot((snap) => {
        console.log('snapshot')
        let results = []
        snap.docs.forEach(doc => {

            //doc.data().createdAt - required, otherwise user recieves 
            //local version of snap using local createdAt. Meaning, 
            // user recieves not fully created snapshot. 
          doc.data().createdAt && results.push({...doc.data(), id:doc.id})
        })

        documents.value = results
        error.value = null
    },  (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    //executes when component it's being used in unmounts
    //unsub from prev collection when watcher is stopped
    // watchEffect((onInvalidate) => {
    //   onInvalidate(() => unsub())
    // })

    return { documents, error }
    
}

export default getCollection