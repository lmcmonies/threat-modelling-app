/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//this composable retrieves documents in a sub collection in the database.
//e.g. players sub collection 
import { ref, watchEffect, reactive } from 'vue'
import { projectFirestore } from '../firebase/config'

const getSubCollection = (collection, documentId, subCollection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection).doc(documentId).collection(subCollection)
    
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
        })
       

        documents.value = results
       
        error.value = null
    },  (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    return { documents, error } 
}

export default getSubCollection