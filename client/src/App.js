import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DefaultPage from "./pages/DefaultPage";
import ProtectedPage from "./pages/ProtectedPage";
import CreateDelegates from "./pages/CreateDelegate";
import API from "./utils/API";
import CreateDelegate from "./pages/CreateDelegate";
// import isAuthenticated from "../db/config/middleware/isAuthenticated"
console.log(API.isAuthenticated)
let getAuth = async()=>{
  let authRes = await API.isAuthenticated()
  let isAuthenticated = await authRes
  return isAuthenticated
}
let isAuthenticated = getAuth()

const PrivateRoute = ({ component: Component, ...rest })=> (
  <Route {...rest} render={(props)=>(
      isAuthenticated === true
      ? <Component {...props} />
      : <Route exact path="/login" component={Login} />
  )} />
)
class App extends Component {
  //the users information will be passed to the compenent via it's state
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null,
      name: null,
      userType: null,
      permissions: null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }
  //when our compenent succesfully renders, we will try to get the information 
  //for the currently logged in user
  componentDidMount = ()=>{
    this.getUser()
  }
  //function to be called when the user first logs in
  updateUser = (userObject)=>{
    this.setState(userObject)
  }
  //getting the current user based on the session.user
  getUser = ()=>{
    API.getUser()
    .then(res =>{
      if (res.status === 200){
        console.log(res.data);
        this.setState({
          email: res.data.email,
          name: res.data.name,
          userType: res.data.userType,
          loggedIn: true,
          permissions: res.data.permissions
        });
      }

      
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={()=> <DefaultPage email={this.state.email} name={this.state.name} userType={this.state.userType}/>}/>
            <Route exact path="/login" component={()=> <Login updateUser={this.updateUser}/>} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/createdelegate" component={CreateDelegate} />
            <PrivateRoute exact path="/protected" component={ProtectedPage} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
