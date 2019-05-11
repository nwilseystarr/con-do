import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/error-page";
import UnauthorizedPage from "./components/unauthorized-page"
// import UserSearch from "./components/UserSearch"
import "./App.css";
import Login from "./components/LoginPage";
import VerifyUser from "./components/verify";
import API from "./utils/API";
import CreateUser from "./components/CreateUserPage";
import CreateEvent from "./components/CreateEventPage"
import Event from "./components/EventPage/eventview"
import Measure from "./components/MeasureDetail"
import MyDelegates from "./components/MyDelegates"
import UpdatePasswordPage from "./components/update-password-page";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
// import isAuthenticated from "../db/config/middleware/isAuthenticated"
// const UserContext = React.createContext("none");


class App extends Component {
  //the users information will be passed to the compenent via it's state
  constructor() {
    super()
    this.state = {
      id: null,
      loggedIn: false,
      email: null,
      name: null,
      userType: null,
      firstLog: false,
      schoolId: null,
      committeeId: null
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
          // console.log(res.data);
          this.setState({
            id: res.data.id,
            email: res.data.email,
            name: res.data.name,
            userType: res.data.userType,
            loggedIn: true,
            firstLog: res.data.firstLog,
            schoolId: res.data.schoolId,
            committeeId: res.data.committeeId
          });
        }
      });
  }
  render() {
    let userProps = {
      userId: this.state.id,
      email: this.state.email,
      name: this.state.name,
      userType: this.state.userType,
      loggedIn: this.state.loggedIn,
      schoolId: this.state.schoolId,
      committeeId: this.state.committeeId
    }
    return (
      //if this is the user's first time logging in, they will need to update their password before 
      //goin anywhere else
      this.state.firstLog ?
      <Router>
        <Switch>
          <Route path="/updatepassword" component={()=> <UpdatePasswordPage {...userProps}/>}/>       
          <Route component={()=> (<Redirect to="/updatepassword" />)} />
        </Switch>
     
      </Router>: 
      // everywhere else
      <Router>
        {/* if the user is logged in they will have access to all routes depending on their type */}
        {this.state.loggedIn ? <Switch>
          <Route exact path="/" component={()=> <LandingPage {...userProps}/>} />
          <Route exact path="/dashboard" component={()=> <Dashboard {...userProps}/>}/>
          <Route exact path="/profile" component={()=> <Profile {...userProps}/>}/>
          

          <Route path="/event/:id" component={(props)=> <Event  {...props} {...userProps}/>} />
          <Route path="/measure/:id" component={(props)=> <Measure  {...props} {...userProps}/>} />
          {/* admin and advisor only routes. If the user is not one of these, they will be given an unauthorized page */}
          {this.state.userType==="admin" || this.state.userType==="advisor" ? 
            <div>
              <Route exact path="/createevent" component={() => <CreateEvent {...userProps}/>} />
              <Route exact path="/createuser" component={() => <CreateUser {...userProps}/>} />
            </div>
            :
            <div>
              <Route exact path="/createevent" component={UnauthorizedPage}/>
              <Route exact path="/createuser" component={UnauthorizedPage}/>} 
            </div>           
          }

             <Route exact path="/mydelegates" component={()=> <MyDelegates loggedIn={this.state.loggedIn} />}/>
           <Route component={()=> <ErrorPage loggedIn={this.state.loggedIn} />} />
          
        </Switch>:
        // if not logged in, then the user can only access the landing page and the login page
        <Switch>
          <Route exact path="/" component={()=> <LandingPage loggedIn={this.state.loggedIn}/>} />
          {/* Auth related routes */}
          <Route path="/verify/:token" component={(props)=> <VerifyUser  {...props}/>} />
          <Route exact path="/login" component={() => <Login updateUser={this.updateUser} />} />
          <Route component={UnauthorizedPage}/>
        </Switch>
      }
        
      </Router>
    );
  }
}

export default App;
