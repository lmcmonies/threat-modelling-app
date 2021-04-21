/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/
import { ref, watchEffect, reactive } from 'vue'
import { projectFirestore } from '../firebase/config'

//this composable retrieves documents in a sub collection of a sub collection. 
//e.g. documents in cards sub sub collection.

const getSubSubCollection = async (collection, documentId, subCollection, subDocId, subSubCollection ) => {
    const cards = ref(null)
    const cardsError = ref(null)

    let collectionRef = projectFirestore.collection(collection).doc(documentId).collection(subCollection)
    .doc(subDocId).collection(subSubCollection)
    
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
        results.push({...doc.data(), cardId:doc.id}) 
        })
       
        cards.value = results

        cardsError.value = null
    },  (err) => {
        console.log(err.message)
        documents.value = null
        cardsError.value = 'could not fetch data'
    })
    return { cards, cardsError }
}

export default getSubSubCollection