import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API"
import Select from "./select-dropdowns"

class CreateDelegate extends Component {
  //the signup state keeps track of all of the input fields in the signup form
    state = {
        email: "",
        name: "",
        userType: "delegate",
        school: "",
        country: "",
        committee: "",
        schoolOptions: [],
        committeeOptions: [],
        recentName: "",
        recentEmail: ""
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
    handleFormSubmit = event =>{
        event.preventDefault();
      
        if (this.state.email && this.state.name && this.state.userType){
          //getting the committeId and schoolId from the database which users will be related to via a foreign key
          // let committeeId = await API.getCommitteeByName(this.state.committee).then(res=> {
          //  return res.data.id
          // })
          // let schoolId = await API.getSchoolByName(this.state.school).then(res=> {
          //  return res.data.id
          // })
          //creating the new user
          API.createUser({
              email: this.state.email,
              name: this.state.name,
              userType: this.state.userType,
              country: this.state.country,
              SchoolId: this.state.school,
              CommitteeId: this.state.committee
            })
                .then(res => {
                  console.log(res)
                  this.setState({
                    recentName: res.data.name,
                    recentEmail: res.data.email
                  })
                });
        }
    }
    render(){
        return(
          <div>
            <form>
            <input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="email (required)"
            />
            <input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="name (first and last)"
            />
            <select value={this.state.userType} onChange={this.handleInputChange} name="userType">
              <option value="admin">admin</option>
              <option value="advisor">advisor</option>
              <option value="staff">staff</option>
              <option value="delegate">delegate</option>
            </select>
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
            <div>
              <p>Account Created for {this.state.recentName}, email sent to {this.state.recentEmail}</p>
            </div>
          </div>
        )
    }
   
}
export default CreateDelegate;