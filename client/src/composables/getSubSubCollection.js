import { ref, watchEffect, reactive } from 'vue'
import { projectFirestore } from '../firebase/config'

const getSubSubCollection = (gamesCollection, gameId, playersCollection, playersId, cardsCollection ) => {
    const cards = ref(null)
    const cardsError = ref(null)

    let collectionRef = projectFirestore.collection(gamesCollection).doc(gameId).collection(playersCollection).doc(playersId).collection(cardsCollection)
    
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
          // console.log(doc.data())
        //   for (let i=0; i<results.length; i++){
        //     console.log("EMAIL: " + results[i].id)
        // }
          
        })
       

        cards.value = results


    //for (let doc in documents){
         //console.log(doc)
        //  console.log(cards)
        // for(let i=0; i <cards['value'].length; i++){
        //    console.log("SUBDOC: " + cards['value'][i].id)
        // }
//  }
        
       
        cardsError.value = null
    },  (err) => {
        console.log(err.message)
        cards.value = null
        cardsError.value = 'could not fetch data'
    })

    //executes when component it's being used in unmounts
    //unsub from prev collection when watcher is stopped
    // watchEffect((onInvalidate) => {
    //   onInvalidate(() => unsub())
    // })

    return { cards, cardsError }
    
}

export default getSubSubCollection