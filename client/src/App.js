import React, { Component } from "react";
import LandingNavbar from "./components/LandingNavbar";
import FeatureCard from "./components/FeatureCard";

class App extends Component {
  render() {
    return (
      <div>
        <LandingNavbar />
        <FeatureCard />
      </div>
    );
  }
}

export default App;
