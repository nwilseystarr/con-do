import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DefaultPage from "./pages/DefaultPage";
import ProtectedPage from "./pages/ProtectedPage";
import API from "./utils/API";
// import isAuthenticated from "../db/config/middleware/isAuthenticated"

const PrivateRoute = ({ component: Component, ...rest })=> (
  <Route {...rest} render={(props)=>(
      API.isAuthenticated === true
      ? <Component {...props} />
      : <Route exact path="/login" component={Login} />
  )} />
)
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={DefaultPage}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/protected" component={ProtectedPage} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
