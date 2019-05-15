import React, { Component } from "react";

class ErrorPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center mt-5 pt-5">
                        <h1>404</h1>
                        <h3>Page Not Found</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorPage;