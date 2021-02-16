import { ref, watchEffect, reactive } from 'vue'
import { projectFirestore } from '../firebase/config'

const getSubCollection = (gamesCollection, gameDocumentId, playersCollection) => {
    const players = ref(null)
    const playersError = ref(null)

    let collectionRef = projectFirestore.collection(gamesCollection).doc(gameDocumentId).collection(playersCollection)
    
    // onSnapshot() - real time listener for DB
    //A document is added, changed, deleted
    //then user gets sent a snapshot.
    //Contains all docs and data at that moment in time
    collectionRef.onSnapshot((snap) => {
        console.log('snapshot')
        let results = []
        snap.docs.forEach(doc => {

            //doc.data().createdAt - required, otherwise user recieves 
            //local version of snap using local createdAt. Meaning, 
            // user recieves not fully created snapshot. 
         results.push({...doc.data(), id:doc.id})
        //   console.log(doc.data())
        //   for (let i=0; i<results.length; i++){
        //     console.log("EMAIL: " + results[i].email)
        // }
          
        })
       

        players.value = results


    //for (let doc in playersCollection){
         //console.log(doc)
        //  console.log(playersCollection)
        // for(let i=0; i <playersCollection['value'].length; i++){
        //    console.log("SUBDOC: " + playersCollection['value'][i].id)
        // }
  //}
        
       
        playersError.value = null
    },  (err) => {
        console.log(err.message)
        players.value = null
        playersError.value = 'could not fetch data'
    })

    //executes when component it's being used in unmounts
    //unsub from prev collection when watcher is stopped
    // watchEffect((onInvalidate) => {
    //   onInvalidate(() => unsub())
    // })

    return { players, playersError }
    
}

export default getSubCollection