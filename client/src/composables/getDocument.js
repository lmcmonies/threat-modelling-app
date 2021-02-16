import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'


const getDocument = (gamesCollection, gameDocumentId) => {
    const gameDocument = ref(null)
    const error = ref(null)

    let documentRef = projectFirestore.collection(gamesCollection).doc(gameDocumentId)
    
    // onSnapshot() - real time listener for DB
    //A gameDocument is added, changed, deleted
    //then user gets sent a snapshot.
    //Contains all docs and data at that moment in time
        documentRef.onSnapshot((snap) => {
         let result = {}
         result = snap.data().createdAt && {...snap.data(), id:snap.id}
         gameDocument.value = result
         error.value = null,

        (err) => {
        console.log(err.message)
        gameDocument.value = null
        error.value = 'could not fetch data'
        }})
    //executes when component it's being used in unmounts
    //unsub from prev gamesCollection when watcher is stopped
    // watchEffect((onInvalidate) => {
    //   onInvalidate(() => unsub())
    // })

    return { gameDocument, error }
}
export default getDocument