import React, { Component } from "react";
import { Link } from "react-scroll";
import logo from "./logo_transparent.png";
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
            <nav className="navbar navbar-expand-md navbar-light sticky-top border-bottom p-1 pr-3">
                <a className="navbar-brand py-0" href="/">
                    <img src={logo} width="70" height="70" className="d-inline-block align-top" alt="Company Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ml-2">




                        {this.props.loggedIn ?
                            <ul className="navbar-nav ml-2">
                                <li className="nav-item mr-3">
                                    <a className="nav-link" href="/dashboard">Dashboard</a>
                                </li>
                                <li className="nav-item mr-3">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-outline-danger px-4 py-2 mb-2" onClick={this.logOut} role="button">Log Out</button>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav ml-2">
                                <li className="nav-item">
                                    <a href="/" className="nav-link mr-3">Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link mr-3"
                                        to="aboutus"
                                        smooth={true}
                                        spy={true}
                                        offset={-90}
                                        duration={500}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link mr-3"
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
                                    <a href="/howto" className="nav-link mr-3">How To</a>
                                </li>
                                <li className="nav-item mr-3">
                                    <Link
                                        to="contact"
                                        className="nav-link"
                                        smooth={true}
                                        spy={true}
                                        offset={-90}
                                        duration={500}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link btn btn-outline-danger px-4 py-2 mb-2" href="/login" role="button">Log In</a>
                                </li>
                            </ul>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;