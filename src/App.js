import React, { Component} from 'react';
import Auth from './containers/Auth/Auth';
import UserData from './components/userData';
import { connect } from 'react-redux';
import { Route, Router, Link } from 'react-router-dom';

class App extends Component{
  state={

  }



  render(){
  // <Link to='/page' />
    return (
      <div>
       
      <Auth />
        {/* <UserData userData={this.props.userData} /> */}
      {/* <Router> */}
        {/* <Route path='/page' exact render={<UserData userData={this.props.userData} />}/> */}
      {/* </Router> */}
     
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
