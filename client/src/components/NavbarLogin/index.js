import React, { Component } from "react";
import condoLogo from "./logo_transparent.png";
import modelUNLogo from "../LoginPage/United_Nations_logo.png";

import "./style.css";
import API from "../../utils/API";

class NavbarLogin extends Component {
    constructor() {
        super()
        this.logOut = this.logOut.bind(this)
    }
    logOut = () => {
        API.logOut()
        window.location.assign("/")
    }
    componentDidMount = () => {
    }

    render() {
        return (
            <div>
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
                                    <a className="nav-link btn btn-danger px-4 py-2 text-white" href="/login" role="button">Log In</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                }
            </div >
        );
    }
}

export default NavbarLogin;