import { updateObjects } from '../utility';
import { stat } from 'fs';


const intialState={
    token:null,
    loading: false,
    error: null,
    userId: null,
    data: null
}

const authStart=(state)=>{
    return updateObjects(state, {loading: true, error: null});
}

const authSuccess=(state, action)=>{
    return updateObjects(state, {loading: false,
         token: action.idToken,
         userId: action.userId,
        error: null })
}
const authFail=(state, action)=>{
    return updateObjects(state, {
        loading: false,
        token: null,
        userId: null,
        error: action.error
    })
}

const authLogout=(state, action)=>{
    return updateObjects(state, {
        token: null,
        userId: null,
    })
}

const userData=(state, action)=>{
    return updateObjects(state, {
        data: action.data
    })
}

const reducer=(state=intialState, action)=>{
    switch(action.type){
        case 'AUTH_START': return authStart(state, action)
        case 'AUTH_SUCCESS': return authSuccess(state, action);
        case 'AUTH_FAIL': return authFail(state, action);
        case 'AUTH_LOGOUT': return authLogout(state, action);
        case 'USER_DATA': return userData(state, action)
        default: return state
    }
    
}

export default reducer;