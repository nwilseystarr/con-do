import React, { Component } from "react";
import Navbar from "../Navbar";
import rolling from "./rolling.gif"

class AboutPage extends Component {
    render() {
        return (
            <img src={rolling} alt="rollingicon"/>      
        );
    }
}

export default AboutPage;