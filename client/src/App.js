import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/error-page";
import AboutPage from "./components/AboutPage";
import "./App.css";
import Login from "./components/LoginPage";
import Signup from "./components/signup-page";
import ProtectedPage from "./components/protected-page";
import VerifyUser from "./components/verify";
import API from "./utils/API";
import CreateUser from "./components/CreateUserPage";
import { Verify } from "crypto";
import UpdatePassword from "./components/Dashboard/update-password";
// import isAuthenticated from "../db/config/middleware/isAuthenticated"

console.log(API.isAuthenticated)
let getAuth = async () => {
  let authRes = await API.isAuthenticated()
  let isAuthenticated = await authRes
  return isAuthenticated
}
let isAuthenticated = getAuth()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
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
  componentDidMount = () => {
    this.getUser()
  }
  //function to be called when the user first logs in
  updateUser = (userObject) => {
    this.setState(userObject)
  }
  //getting the current user based on the session.user
  getUser = () => {
    API.getUser()
      .then(res => {
        if (res.status === 200) {
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
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/aboutus" component={AboutPage} />

          <Route exact path="/createuser" component={() => <CreateUser userType={this.state.userType}/>} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/verify/:token" component={VerifyUser} />
          <PrivateRoute exact path="/protected" component={() => <ProtectedPage updateUser={this.updateUser} />} />
          
          <Route exact path="/login" component={() => <Login updateUser={this.updateUser} />} />
          <Route path="/updatepassword" component={UpdatePassword}/>
          
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
