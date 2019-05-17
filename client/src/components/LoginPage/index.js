import React, { Component } from "react";
// import { Link } from "react-router-dom";
import API from "../../utils/API";
// import { derToJose } from "ecdsa-sig-formatter";
import NavbarLogin from "../NavbarLogin";
import LoginJumbotron from "./jumbotron";

class Login extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            redirectTo: null,
            loginMessage: ""
        }
        this.handleInputChange.bind(this)
        this.handleFormSubmit.bind(this)
    }
    //updating our input fields as the user enters keys
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    //calling the loginUser method of our API which routes to the backend and attempts to log in user agent via passport
    //with the given credentials
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            API.loginUser({
                email: this.state.email,
                password: this.state.password,
                firstLog: false
            })
                .then(res => {
                    console.log(res)
                    if (res.data.email) {
                        //updating our user state
                        this.props.updateUser({
                            loggedIn: true,
                            email: res.data.email,
                            name: res.data.name,
                            userType: res.data.userType
                        })
                        window.location.assign("/dashboard")
                    }
                    else{
                        this.setState({
                            loginMessage: "Invalid email or password!"
                        })
                    }
                });
        }
    }
    render() {
        return (
            <div>
                <NavbarLogin loggedIn={this.props.loggedIn} userType={this.props.userType}/>
                <div className="container-fluid mt-5 pt-3 mb-5">
                    <LoginJumbotron />
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h6 className="text-danger">{this.state.loginMessage}</h6>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="pt-2 border-bottom border-dark rounded-0"><i className="fas fa-envelope fa-lg"></i></span>
                                    </div>
                                    <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                                        aria-describedby="emailBlock"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="email"
                                        placeholder="Email (required)"
                                    />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="pt-2 border-bottom border-dark rounded-0"><i className="fas fa-lock fa-lg"></i></span>
                                    </div>
                                    <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        type="password"
                                        name="password"
                                        placeholder="Password (required)"
                                    />
                                </div>
                                <button className="btn btn-dark px-5"
                                    type="submit"
                                    name="login"
                                    onClick={this.handleFormSubmit}
                                >Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
export default Login;