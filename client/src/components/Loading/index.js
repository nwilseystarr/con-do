import React, { Component } from "react";
import Navbar from "../Navbar";
import rolling from "./rolling.gif"

class AboutPage extends Component {
    render() {
        return (
        <div>
            <h2>Loading Data</h2>
            <img src={rolling} alt="rollingicon"/>      
        </div>
        );
    }
}

export default AboutPage;