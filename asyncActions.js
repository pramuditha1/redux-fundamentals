const redux = require('redux')
const createStore = redux.createStore
// apply middleware to store
const applyMiddleware = redux.applyMiddleware
//action creator functions make api requests and it need axios
const axios = require('axios')
//middleware , define async action creators
const thunkMiddleware = require('redux-thunk').default

//inital store
const initialState = {
    loading: false,
    users: [],
    error: ''
}
//actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }    
}

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,//api request success and payload has users array then update state with values
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
                //api request fails and payload has error message and update state with error message
            }
    }
}

/*action creator function returns an action. within action creator we dispatch appropiate actions
what the thunk middleware brings to the table, 
 is the ability for a action creator to return a function instead of object.*/
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is the array of users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                //response.error is the error description
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

//create store has 2 parameters reducer and middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())