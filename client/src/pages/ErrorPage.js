import React, { Component } from "react";

class ErrorPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>404</h1>
                        <h2>Page Not Found</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorPage;