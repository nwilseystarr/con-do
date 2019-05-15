import React, { Component } from "react";
import { Link } from "react-scroll";
import condoLogo from "./logo_transparent.png";
import modelUNLogo from "../LoginPage/United_Nations_logo.png";

import "./style.css";
import API from "../../utils/API";

class Navbar extends Component {
    constructor() {
        super()
        this.logOut = this.logOut.bind(this)
    }
    logOut = () => {
        API.logOut()
        window.location.assign("/")
    }
    render() {
        return (
            <div>
                {this.props.loggedIn ?
                    <nav className="navbar navbar-expand-md navbar-light fixed-top border-bottom p-1 pr-3">
                        <a className="navbar-brand py-0" href="/dashboard">
                            <img src={modelUNLogo} width="70" height="60" className="d-inline-block align-top" alt="Model United Nations Logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon navbar-dark"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav ml-2">
                                <li className="nav-item mr-3">
                                    <a className="nav-link" href="/dashboard">Dashboard</a>
                                </li>
                                <li className="nav-item mr-3">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item mr-3">
                                    <a className="nav-link" href="/chat">Chat</a>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-outline-danger px-4 py-2" onClick={this.logOut}>Log Out</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    :
                    <nav className="navbar navbar-expand-md navbar-light fixed-top border-bottom p-1 pr-3">
                        <a className="navbar-brand py-0" href="/">
                            <img src={condoLogo} width="70" height="70" className="d-inline-block align-top" alt="Company Logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon navbar-dark"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav ml-2">
                                <li className="nav-item">
                                    <a href="/" className="nav-link mr-3">Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link mr-3"
                                        activeClass="active-link"
                                        to="features"
                                        smooth={true}
                                        spy={true}
                                        offset={-90}
                                        duration={500}
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link mr-3"
                                        activeClass="active-link"
                                        to="aboutus"
                                        smooth={true}
                                        spy={true}
                                        offset={-90}
                                        duration={500}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <a href="/howto" className="nav-link mr-3">How To</a>
                                </li> */}
                                <li className="nav-item">
                                    <Link
                                        className="nav-link mr-3"
                                        to="contact"
                                        activeClass="active-link"
                                        smooth={true}
                                        spy={true}
                                        offset={-100}
                                        duration={500}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link btn btn-outline-danger px-4 py-2" href="/login" role="button">Log In</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                }
            </div >
        );
    }
}

export default Navbar;