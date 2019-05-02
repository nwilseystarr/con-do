import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route component={ErrorPage} />
          </Switch>
      </Router>
    );
  }
}

export default App;
