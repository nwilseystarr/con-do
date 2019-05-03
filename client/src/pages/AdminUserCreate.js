import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../utils/API"
import Select from "../components/Select"

class CreateDelegate extends Component {
  //the signup state keeps track of all of the input fields in the signup form
    state = {
        email: "",
        password: "",
        name: "",
        userType: "",
        school: "",
        country: "",
        committee: "",
        schoolOptions: [],
        committeeOptions: []
    }
    //get all the options when the component first mounts
    componentDidMount = ()=>{
      this.getOptions();
    }
    getOptions = ()=>{
      API.getSchools().then(res =>{
        this.setState({schoolOptions: res.data})
      })
      API.getCommittees().then(res=>{
        this.setState({committeeOptions: res.data})
      })
    }
    handleSelect = (selected) =>{
      const  name = selected.name
      const value = selected.value
      this.setState({
        [name]: value
      })
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
          //getting the committeId and schoolId from the database which users will be related to via a foreign key
          let committeeId = await API.getCommitteeByName(this.state.committee).then(res=> {
           return res.data.id
          })
          let schoolId = await API.getSchoolByName(this.state.school).then(res=> {
           return res.data.id
          })
          //creating the new user
          await API.createUser({
              email: this.state.email,
              password: this.state.password,
              name: this.state.name,
              userType: this.state.userType,
              country: this.state.country,
              SchoolId: this.state.school,
              CommitteeId: this.state.committee
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
            <Select name="school"  options={this.state.schoolOptions} handleSelect={this.handleSelect} />               
            <Select name="committee"  options={this.state.committeeOptions} handleSelect={this.handleSelect} />
            <input
                value={this.state.country}
                onChange={this.handleInputChange}
                name="country"
                placeholder="country"
            />
            <button
                type="submit"
                name="createDelegate"
                onClick={this.handleFormSubmit}
            >Sign Up
            </button>
          </form>
        )
    }
   
}
export default CreateDelegate;