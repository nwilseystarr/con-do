import React, { Component } from "react";
import LandingNavbar from "../components/LandingNavbar";
import Carousel from "../components/Carousel";
import FeatureCard from "../components/FeatureCard";
import ContactForm from "../components/ContactForm";

class LandingPage extends Component {
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

export default LandingPage;