import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

class Auth extends Component{

    state={

        controls: {
            email: {
                elemType: 'email',
                elemConfig:{
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elemType: 'email',
                elemConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },

            
        },
        isSignUp:true,

        data: []
        
    }
     
    checkValidity(value, rules){
       
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=="" && isValid
        }
        
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid
        }
        if(rules.maxLength){
         isValid=value.length<=rules.maxLength && isValid
        }
        if(rules.isEmail){
            const pattern=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            isValid=pattern.test(value) && isValid;
        }
        if(rules.isRequired){
            const pattern=/^\d+$/;
            isValid=pattern.test(value) && isValid
        }
       
        return isValid
 
    }
    
    onChangeHandler=(event, controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{...this.state.controls[controlName],
            value:event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true,}
        }

        this.setState({
            controls: updatedControls
        })
    }
    
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp)
        // .then(response=>{
        //     this.props.data(this.props.token) 
        // })
    }
    
signUpToggle=()=>{
    let isSignUp=this.state.isSignUp;

    this.setState({
            isSignUp: !isSignUp     
    })
}

// componentDidUpdate(prevProp){

//     let resp=null;
//     if(this.props.token!==prevProp.token){
//          axios.get('https://appinesstask.firebaseio.com/user.json?auth='+this.props.token)
//     .then(res=>{console.log(res.data);
//             resp.push(res.data)
//     })
//     .catch(error=>{
//       console.log(error)
//     })
//     }

   
  
//   }

componentDidMount(){
    // console.log(prevProp)
    if(this.props.token){
        this.props.data(this.props.token) 
    }
   
}

    render(){
        const formElementsArray=[];
         for(let key in this.state.controls){
            formElementsArray.push({id:key,
                    config: this.state.controls[key]})
        }
           
        let form= formElementsArray.map(formElement=>{

            return (
                <Input key={formElement.id}
                    elemType={formElement.config.elemType}
                    elemConfig={formElement.config.elemConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldUpdate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.onChangeHandler(event, formElement.id)}/>
            )
        })
        
        if(this.props.loading){
            form=<Spinner />
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=this.props.error
        }   
        return (
            <div>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success" >Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.signUpToggle}>{this.state.isSignUp?'Switch to Sign In' : 'Switch to Sign Up'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAuth:(email, password, isSignUp)=> dispatch(actions.auth(email, password, isSignUp)),
        data:(token)=>dispatch(actions.userData(token))
    }
}

const mapStateToProps=(state)=>{
    console.log(state)
    return {
         loading: state.auth.loading,
         error: state.auth.error,
         token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);