import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../utils/API"

class CreateDelegate extends Component {
  //the signup state keeps track of all of the input fields in the signup form
    state = {
        email: "",
        password: "",
        name: "",
        userType: "",
        school: "",
        country: "",
        committee: ""
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
    //on submit we attempt to create a new user with the given values via the API that hits a route that queries our database
    handleFormSubmit = async event =>{
        event.preventDefault();
      
        if (this.state.email && this.state.password && this.state.name && this.state.userType){
          let committeeId = await API.getCommitteeByName(this.state.committee).then(res=> {
            console.log(res);
           return res.data.id
          })
          let schoolId = await API.getSchoolByName(this.state.school).then(res=> {
            console.log(res);
           return res.data.id
          })
          console.log("committeID: " + committeeId);
            await API.createUser({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                userType: this.state.userType,
                country: this.state.country,
                SchoolId: schoolId,
                CommitteeId: committeeId
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
                value={this.state.userType}
                onChange={this.handleInputChange}
                name="userType"
                placeholder="user type"
            />
            <input
                value={this.state.school}
                onChange={this.handleInputChange}
                name="school"
                placeholder="school"
            />
            <input
                value={this.state.country}
                onChange={this.handleInputChange}
                name="country"
                placeholder="country"
            />
            <input
                value={this.state.committee}
                onChange={this.handleInputChange}
                name="committee"
                placeholder="committee"
            />
            <button
                type="submit"
                name="createDelegate"
                onClick={this.handleFormSubmit}
            >Sign Up </button>
          </form>
        )
    }
   
}
export default CreateDelegate;