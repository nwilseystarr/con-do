import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/error-page";
import UnauthorizedPage from "./components/unauthorized-page"
import UserSearch from "./components/UserSearch"
import "./App.css";
import Login from "./components/LoginPage";
import VerifyUser from "./components/verify";
import API from "./utils/API";
import CreateUser from "./components/CreateUserPage";
import CreateEvent from "./components/CreateEventPage"
import Event from "./components/eventview"
import { Verify } from "crypto";
import UpdatePasswordPage from "./components/update-password-page";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
// import isAuthenticated from "../db/config/middleware/isAuthenticated"
const UserContext = React.createContext("none");


class App extends Component {
  //the users information will be passed to the compenent via it's state
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null,
      name: null,
      userType: null,
      firstLog: false
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
            id: res.data.id,
            email: res.data.email,
            name: res.data.name,
            userType: res.data.userType,
            loggedIn: true,
            firstLog: res.data.firstLog
          });
        }
      });
  }
  render() {
    return (
      //if this is the user's first time logging in, they will need to update their password before 
      //goin anywhere else
      this.state.firstLog ?
      <Router>
        <Switch>
          <Route path="/updatepassword" component={()=> <UpdatePasswordPage loggedIn={this.state.loggedIn}/>}/>       
          <Route component={()=> (<Redirect to="/updatepassword" />)} />
        </Switch>
     
      </Router>: 
      // everywhere else
      <Router>
        <Switch>
          <Route exact path="/" component={()=> <LandingPage loggedIn={this.state.loggedIn}/>} />
          {/* <Route exact path="/aboutus" component={()=> <AboutPage loggedIn={this.state.loggedIn}/>} /> */}
          <Route exact path="/usersearch" component={UserSearch}/>
          <Route exact path="/dashboard" component={()=> <Dashboard loggedIn={this.state.loggedIn}  userType={this.state.userType}/>}/>
          <Route exact path="/profile" component={()=> <Profile loggedIn={this.state.loggedIn}  userType={this.state.userType}/>}/>
          
          {/* Auth related routes */}
          <Route path="/verify/:token" component={(props)=> <VerifyUser  {...props}/>} />
          <Route exact path="/login" component={() => <Login updateUser={this.updateUser} />} />

          <Route path="/event/:id" component={(props)=> <Event  {...props} loggedIn={this.state.loggedIn} userId={this.state.id}/>} />

          {/* admin & advisor only routes */}
          {/* /creatuser html route will either render the createuser component, or the unauthorizedpage component based on the type of user */}
          {this.state.userType==="admin" || this.state.userType==="advisor" ? <Route exact path="/createuser" component={() => <CreateUser userType={this.state.userType}/>} />:
            <Route exact path="/createuser" component={UnauthorizedPage}/>}
         
          {/* /creatuser html route will either render the createuser component, or the unauthorizedpage component based on the type of user */}
          {this.state.userType==="admin" || this.state.userType==="advisor" ? <Route exact path="/createevent" component={() => <CreateEvent userType={this.state.userType}/>} />:
            <Route exact path="/createevent" component={UnauthorizedPage}/>}
           <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
