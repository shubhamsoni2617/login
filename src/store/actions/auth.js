import axios from 'axios';

export const userData=(token)=>dispatch=>{
    const arr=[];

    axios.get('https://appinesstask.firebaseio.com/user.json?auth='+token)
    .then(response=>{
        for(let prop in response.data){
            arr.push({...response.data[prop]})
        }
        // console.log(response.data)
    })
    .catch(error=>{
        console.log(error)
    })

    return dispatch({
        type: 'USER_DATA',
        data: arr
    })
}

const authStart=()=>{
    return {
        type: 'AUTH_START'
    }
}

const authSuccess=(token, userId)=>{
    return {
        type: 'AUTH_SUCCESS',
        idToken: token,
        userId: userId
    }
}

const authFail=(error)=>{
    return {
        type: 'AUTH_FAIL',
        error:error
    }
}

const authLogout=()=>{
    return {
        type: 'AUTH_LOGOUT'
    }
}

const authLogoutExp=(expirationTime)=>dispatch=>{

    return (setTimeout(()=>{dispatch(authLogout())},
         expirationTime*1000)
         )
}

export const auth= (email, password, isSignUp)=>dispatch=>{

    dispatch(authStart());
    const authData={
        email: email,
        password: password,
        returnSecureToken: true
    }
    if(isSignUp){
         axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAYMtOiqk5Vxj-HCi_hr89QQeVTF90JNdA', authData)
         .then(res=>{
         console.log(res.data);
         dispatch(authSuccess(res.data.idToken, res.data.localId))
    })
    .catch(error=>{
        console.log(error);
        console.log(error.response.data.error.message)
        dispatch(authFail(error.response.data.error.message))
    })
    }
   else if(!isSignUp){
   
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAYMtOiqk5Vxj-HCi_hr89QQeVTF90JNdA', authData)
        .then(res=>{
        // console.log(res.data);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(authLogoutExp(res.data.expiresIn))
        dispatch(userData(res.data.idToken))
   })
   .catch(error=>{
       console.log(error);
    //    console.log(error.response.data.error.message)
       dispatch(authFail(error.response.data.error.message))
   })
   
   }
}