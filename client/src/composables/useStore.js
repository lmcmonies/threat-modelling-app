/*
     Threat Modelling Game 
     Final Year Dissertation Project 
     Heriot Watt University
     Author: Liam McMonies
     Email: lm384@hw.ac.uk
*/

//A composable that contains methods for accessing and updating data held in vuex store. 
//Specifically written for use with composition API as these methods are not provided by default at present. 
import {computed} from 'vue'
import {useStore} from 'vuex'

//retrieves state from store
export function useState(arr){
    const store = useStore()
    const keypair = arr.map(s => [s, computed(() => store.state[s])])
    return Object.fromEntries(keypair)
}

//enables a getter to be used from the store to retrieve data.
export function useGetters(arr){
    const store = useStore()
    const keypair = arr.map(g => [g, computed(() => store.getters[g])])
    console.log(keypair)
    return Object.fromEntries(keypair)
}

//enables a mutation to be performed.
export function useMutations(arr){
    const store = useStore()
    const keypair = arr.map(m => [m, input => store.commit(m, input)])
    return Object.fromEntries(keypair)
}

//enables an action to be performed. 
export function useActions(arr){
    const store = useStore()
    const keypair = arr.map(a => [a, input => store.dispatch(a, input)])
    return Object.fromEntries(keypair)
}

