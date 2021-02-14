import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'


const getDocument = (collection, documentId) => {
    const document = ref(null)
    const error = ref(null)

    let documentRef = projectFirestore.collection(collection).doc(documentId)
    
    // onSnapshot() - real time listener for DB
    //A document is added, changed, deleted
    //then user gets sent a snapshot.
    //Contains all docs and data at that moment in time
        documentRef.onSnapshot((snap) => {
         let result = {}
         result = snap.data().createdAt && {...snap.data(), id:snap.id}
         document.value = result
         error.value = null,

        (err) => {
        console.log(err.message)
        document.value = null
        error.value = 'could not fetch data'
        }})
    //executes when component it's being used in unmounts
    //unsub from prev collection when watcher is stopped
    // watchEffect((onInvalidate) => {
    //   onInvalidate(() => unsub())
    // })

    return { document, error }
}
export default getDocument