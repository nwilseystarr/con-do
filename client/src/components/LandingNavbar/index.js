import React, { Component } from "react";
import logo from "./logo_transparent.png";
import "./style.css";

class LandingNavbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light sticky-top border-bottom p-1 pr-3">
                <a className="navbar-brand py-0" href="/">
                <img src={logo} width="70" height="70" class="d-inline-block align-top" alt="Company Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ml-2">
                        <li className="nav-item">
                            <a className="nav-link mr-3" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mr-3" href="/aboutus">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mr-3" href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mr-3" href="/howto">How To</a>
                        </li>
                        <li className="nav-item mr-3">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn btn-outline-danger px-4 py-2 mb-2" href="/login" role="button">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default LandingNavbar;