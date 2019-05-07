import React, { Component } from "react";
import Navbar from "../Navbar";
import Carousel from "./carousel";
import FeatureCard from "./feature-card";
import AboutPage from "./about";
import ContactForm from "./contact-form";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Navbar loggedIn={this.props.loggedIn}/>
                <Carousel />
                <FeatureCard />
                <AboutPage />
                <ContactForm />
            </div>
        );
    }
}

export default LandingPage;