import reducer from './auth'
import { combineReducers } from 'redux'

const rootReducer=combineReducers({
    auth: reducer
})

export default rootReducer;