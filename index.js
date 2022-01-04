/*
redux store responsibilities
 - holds application state
 - allows access to state via getState()
 - allows state to be updated via dispatch(action)
 - register listeners via subscribe(listener)
 - handles unregistering of listeners via the function returned by subscribe(listener)
*/
const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers

const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

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

const initialStateCake = {
    numOfCakes:    10
}

const initialStateIceCream = {
    numOfIcecream: 20
}

const cakeReducer = (state = initialStateCake, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }//use spread operator: make a copy of state object and update only numOfCakes value in initial state object

        default: return state
    }
}

const iceCreamReducer = (state = initialStateIceCream, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIcecream: state.numOfIcecream - 1
        }

        default: return state
    }
}

//create store
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
/* 
after rootReducer parameter we apply a middleware
What is the middleware it is logger. 
provide a 3rd patry extension point between dispatching an action & the moment it reached the reducer. 
we use muddleware for logging, crash reporting, performing asynchronous tasks etc...
*/
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())

//subscribe a listner to log the store value when store updated. everytime dispatch an action listner executes
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()