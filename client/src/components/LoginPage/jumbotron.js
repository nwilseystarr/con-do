import React, { Component } from "react";
import "./style.css";
import confLogo from "./United_Nations_logo.png";

class LoginJumbotron extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="jumbotron jumbotron-fluid text-center mt-5 pt-5 pb-0">
                        <div className="conference-img mb-2">
                            <img className="img-fluid" src={confLogo} alt="Model United Nations Logo"/>
                        </div>
                        <h1 className="display-5">Model United Nations Conference</h1>
                        <h4>Login</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginJumbotron;
