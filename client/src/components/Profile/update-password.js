import React, { Component } from "react";
import API from "../../utils/API";

class UpdatePassword extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor() {
        super()
        this.state = {
            password: "",
            passwordConfirm: "",
            redirectTo: null
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
        if (this.state.password === this.state.passwordConfirm) {
            //once the userupdates their password we can clear first log
            API.updatePW({
                password: this.state.password, firstLog: false
            })
                .then(res => {
                    window.location.assign("/dashboard")
                });
        }
    }
    render() {
        return (
            <div className="card border-0 mt-5">
                <div className="card-body">
                    <h4>Change Password?</h4>
                    {this.state.password === this.state.passwordConfirm ? <div></div> : <div>Passwords Must Match!</div>}
                    <form>
                        <div className="form-group input-group">
                            <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-1"
                                aria-describedby="emailBlock"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                type="password"
                                name="password"
                                placeholder="New Password"
                            />
                        </div>
                        <div className="form-group input-group">
                            <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-1"
                                value={this.state.passwordConfirm}
                                onChange={this.handleInputChange}
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm New Password"
                            />
                        </div>
                        <button className="btn btn-outline-dark px-3"
                            type="submit"
                            name="login"
                            onClick={this.handleFormSubmit}
                        >Update Password</button>
                    </form>
                </div>
            </div>
        )
    }

}
export default UpdatePassword;