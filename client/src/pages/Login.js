import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../utils/API"
import { derToJose } from "ecdsa-sig-formatter";

class Login extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
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
    handleFormSubmit = event =>{
        event.preventDefault();
        if (this.state.email && this.state.password){
            API.loginUser({
                email: this.state.email,
                password: this.state.password,
            })
                .then(res => {
                    console.log(res)
                    if (res.status === 200){
                        //updating our user state
                        this.props.updateUser({
                            loggedIn: true,
                            email: res.data.email,
                            name: res.data.name,
                            userType: res.data.userType
                        })
                    }
                });
        }
    }
    render(){
        return(
            <form>
            <input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="email (required)"
            />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              name="password"
              placeholder="password (required)"
            />
            <button
                type="submit"
                name="login"
                onClick={this.handleFormSubmit}
            >Log In</button>
          </form>
        )
    }
   
}
export default Login;