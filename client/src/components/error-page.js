import React, { Component } from "react";
import Navbar from "./Navbar"
class ErrorPage extends Component {
    render() {
        return (
            <div>
                <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>
            
            <div className="container">
                <div className="row">
                    <div className="col text-center mt-5 pt-5">
                        <h1>404</h1>
                        <h3>Page Not Found</h3>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ErrorPage;