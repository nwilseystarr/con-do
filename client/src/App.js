import React, { Component } from "react";
import LandingNavbar from "./components/LandingNavbar";
import FeatureCard from "./components/FeatureCard";
import ContactForm from "./components/ContactForm";
import Carousel from "./components/Carousel";

class App extends Component {
  render() {
    return (
      <div>
        <LandingNavbar />
        <Carousel />
        <FeatureCard />
        <ContactForm />
      </div>
    );
  }
}

export default App;
