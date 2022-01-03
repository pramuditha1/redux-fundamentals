/*
redux store responsibilities
 - holds application state
 - allows access to state via getState()
 - allows state to be updated via dispatch(action)
 - register listeners via subscribe(listener)
 - handles unregistering of listeners via the function returned by subscribe(listener)
*/
const redux = require('redux')
const createStore = redux.createStore


//action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIcecream(){
    return {
        type: BUY_ICECREAM
    }
}

//reducer
// (previousState, action) => newState

const initialState = {
    numOfCakes:    10,
    numOfIcecream: 20
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }//use spread operator: make a copy of state object and update only numOfCakes value in initial state object
        case BUY_ICECREAM: return {
            ...state,
            numOfIcecream: state.numOfIcecream - 1
        }

        default: return state
    }
}

//create store
const store = createStore(reducer)
console.log('Initial state', store.getState())

//subscribe a listner to log the store value when store updated. everytime dispatch an action listner executes
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()