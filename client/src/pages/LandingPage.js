import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import FeatureCard from "../components/FeatureCard";
import ContactForm from "../components/ContactForm";

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