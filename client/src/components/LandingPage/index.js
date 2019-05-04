import React, { Component } from "react";
import Navbar from "../Navbar";
import Carousel from "./carousel";
import FeatureCard from "./feature-card";
import ContactForm from "./contact-form";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Carousel />
                <FeatureCard />
                <ContactForm />
            </div>
        );
    }
}

export default LandingPage;