import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DefaultPage from "./pages/DefaultPage"
import ProtectedPage from "./pages/ProtectedPage"
import API from "./utils/API"
// import isAuthenticated from "../db/config/middleware/isAuthenticated"

const PrivateRoute = ({ component: Component, ...rest })=> (
  <Route {...rest} render={(props)=>(
      API.isAuthenticated === true
      ? <Component {...props} />
      : <Route exact path="/login" component={Login} />
  )} />
)
class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null,
      name: null,
      userType: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount = ()=>{
    this.getUser()
  }

  updateUser = (userObject)=>{
    this.setState(userObject)
  }

  getUser = ()=>{
    API.getUser()
    .then(res =>{
      if (res.status === 200){
        this.setState({
          email: res.data.email,
          name: res.data.name,
          userType: res.data.userType,
          loggedIn: true
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
            <PrivateRoute exact path="/protected" component={ProtectedPage} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
