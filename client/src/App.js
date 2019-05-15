import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/error-page";
import UnauthorizedPage from "./components/unauthorized-page";
import "./App.css";
import Login from "./components/LoginPage";
import VerifyUser from "./components/verify";
import API from "./utils/API";
import CreateUser from "./components/CreateUserPage";
import CreateEvent from "./components/CreateEventPage";
import Event from "./components/EventPage/eventview";
import Measure from "./components/MeasureDetail";
import MyDelegates from "./components/MyDelegates";
import UserDetail from "./components/UserDetail"
import UpdatePasswordPage from "./components/update-password-page";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
// import isAuthenticated from "../db/config/middleware/isAuthenticated"
// const UserContext = React.createContext("none");


class App extends Component {
  //the users information will be passed to the compenent via it's state
  constructor(props) {
    super(props);
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
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  //when our component succesfully renders, we will try to get the information 
  //for the currently logged in user
  componentDidMount = () => {
    this.getUser();
  };

  //function to be called when the user first logs in
  updateUser = (userObject) => {
    this.setState(userObject);
  };

  //getting the current user based on the session.user
  getUser = () => {
    API.getUser()
      .then(res => {
        if (res.status === 200) {
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
    //declare userProps here to pass to all compononents
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
            <Route path="/updatepassword" component={() => <UpdatePasswordPage {...userProps} />} />
            <Route component={() => (<Redirect to="/updatepassword" />)} />
          </Switch>

        </Router> :
        // everywhere else
        <Router>
          {/* if the user is logged in they will have access to all routes depending on their type */}
          {this.state.loggedIn ? <Switch>
            <Route exact path="/" component={() => <LandingPage {...this.state} />} />
            <Route exact path="/dashboard" component={() => <Dashboard {...this.state} />} />
            <Route exact path="/profile" component={() => <Profile {...this.state} />} />


            <Route path="/event/:id" component={(props) => <Event  {...props} {...this.state} />} />
            <Route path="/measure/:id" component={(props) => <Measure  {...props} {...this.state} />} />
            <Route exact path="/chat" component={() => <Chat {...this.state} />} />

            <Route path="/user/:id" component={(props) => <UserDetail  {...props} {...this.state} />} />

            {/* admin and advisor only routes. If the user is not one of these, they will be given an unauthorized page */}
            {this.state.userType === "admin" || this.state.userType === "advisor" ?
              <Route exact path="/createevent" component={() => <CreateEvent {...this.state} />} />
              :
              <Route exact path="/createevent" component={() => <UnauthorizedPage {...this.state} />} />
            }
            {this.state.userType === "admin" || this.state.userType === "advisor" ?
              <Route exact path="/createuser" component={() => <CreateUser {...this.state} />} />
              :
              <Route exact path="/createuser" component={() => <UnauthorizedPage {...this.state} />} />}

            {this.state.userType === "admin" || this.state.userType === "advisor" ?
              <Route exact path="/mydelegates" component={() => <MyDelegates {...this.state} />} />
              : 
              <Route exact path="/mydelegates" component={() => <UnauthorizedPage {...this.state} />} />}
            }

            <Route component={() => <ErrorPage loggedIn={this.state.loggedIn} />} />

          </Switch> :
            // if not logged in, then the user can only access the landing page and the login page
            <Switch>
              <Route exact path="/" component={() => <LandingPage {...this.state} />} />
              {/* Auth related routes */}
              <Route path="/verify/:token" component={(props) => <VerifyUser  {...props} />} />
              <Route exact path="/login" component={() => <Login updateUser={this.updateUser} {...this.state}/>} />
              <Route component={() => <UnauthorizedPage {...this.state} />} />
            </Switch>
          }
        </Router>
    );
  }
}

export default App;
