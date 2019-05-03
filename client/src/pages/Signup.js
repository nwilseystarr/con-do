import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../utils/API"

class Signup extends Component {
  //the signup state keeps track of all of the input fields in the signup form
    state = {
        email: "",
        password: "",
        name: "",
        userType: "",
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
    //on submit we attempt to create a new user with the given values via the API that hits a route that queries our database
    handleFormSubmit = event =>{
        event.preventDefault();
        if (this.state.email && this.state.password && this.state.name && this.state.userType){
            API.createUser({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                userType: this.state.userType
            })
                .then(res => window.location.assign("/login"));
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
            <input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="name (first and last)"
            />
            <input
                value={this.state.type}
                onChange={this.handleInputChange}
                name="userType"
                placeholder="user type"
            />
            <button
                type="submit"
                name="signup"
                onClick={this.handleFormSubmit}
            >Sign Up </button>
          </form>
        )
    }
   
}
export default Signup;