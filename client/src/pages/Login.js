import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../utils/API"

class Login extends Component {
    state = {
        email: "",
        password: "",
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
    handleFormSubmit = event =>{
        event.preventDefault();
        if (this.state.email && this.state.password){
            API.loginUser({
                email: this.state.email,
                password: this.state.password,
            })
                .then(res => window.location.assign("/"));
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