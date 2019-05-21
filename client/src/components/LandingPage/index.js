import React, { Component } from "react";
import Navbar from "../Navbar";
import Carousel from "./carousel";
import FeatureCard from "./feature-card";
import AboutPage from "./about";
import ContactForm from "./contact-form";
import DemoVideo from "./demo-video"

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType} />
                <Carousel />
                <FeatureCard />
                <DemoVideo />
                <AboutPage />
                <ContactForm />
            </div>
        );
    }
}

export default LandingPage;