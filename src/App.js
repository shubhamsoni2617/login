import React, { Component} from 'react';
import Auth from './containers/Auth/Auth';
import UserData from './components/userData';
import { connect } from 'react-redux';

class App extends Component{
  state={

  }



  render(){
  
    // let d;
    // if(this.props.userData){
    //   d=<UserData />
    // }
    return (
      <div>
       
      <Auth />
        <UserData userData={this.props.userData} />
      {/* {d} */}
      </div>
      
    )
  }
}

const mapStateToProps=(state)=>{
  console.log(state)
  return {
      userData: state.auth.data
}
  }
  

export default connect(mapStateToProps)(App)
