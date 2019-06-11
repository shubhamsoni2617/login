import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserData extends Component{
    state={
        users:[]
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.userData!==prevProps.userData){

    //         this.setState({
    //             users: this.props.userData
    //         })
    //     }
    // }

    render(){
        let data=[];
        if(this.props.userData){
            console.log(this.props.userData);
            console.log(this.props.userData.length);
        }
        

        if(this.props.userData){
            data= this.props.userData.map(user=>{
                console.log(user)
                return <li>{user.name}</li>
            })
        }

        return (
            <div>
                {data}
            </div>
        )
    }
}

// const mapStateToProps=(state)=>{
//     console.log(state)
//     return {
//         userData: state.auth.data
// }
//     }
    

export default UserData