import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom"
import API from "../../utils/API"
import Select from "./select-dropdowns"

class CreateUser extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      email: "",
      name: "",
      userType: "delegate",
      school: "",
      country: "",
      committee: "",
      schoolOptions: [],
      committeeOptions: [],
      recentName: "",
      recentEmail: "",
      committeeAddInput: "",
      schoolAddInput: ""
    }
  
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
          //if an admin is creating the account, they will submit a value for each attribute
          if (this.props.userType === "admin"){
            API.createUser({
              email: this.state.email,
              name: this.state.name,
              userType: this.state.userType,
              country: this.state.country,
              schoolId: this.state.school,
              committeeId: this.state.committee
            })
                .then(res => {
                  console.log(res)
                  this.setState({
                    recentName: res.data.name,
                    recentEmail: res.data.email,
                    email: "",
                    name: "",
                    userType: "delegate",
                    country: "",
                  })
                });
          }
          //if an advisor is creating the account, the will only submit certain values, the rest will be resolved in the route
          else{
            API.createUser({
              email: this.state.email,
              name: this.state.name,
              country: this.state.country,
              committeeId: this.state.committee
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
    }
    //handling submit for committee add
    handleAddCommittee = event =>{
      event.preventDefault()
      if (this.state.committeeAddInput){
        API.addCommittee({name: this.state.committeeAddInput})
          .then(res =>{
            console.log(res)
            this.setState({
              committeeAddInput: ""
            })
            this.getOptions()
          })
      }
    }
    handleAddSchool = event =>{
      event.preventDefault()
      if (this.state.schoolAddInput){
        API.addSchool({name: this.state.schoolAddInput})
          .then(res =>{
            console.log(res)
            this.setState({
              schoolAddInput: ""
            })
            this.getOptions()
          })
      }
    }
    render(){
    return (
      this.props.userType === "admin" || this.props.userType === "advisor" ?
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-lg-8">
              <h3>Add New User</h3>
              <form>
                <div className="form-group row input-group">
                  <label for="emailInput" className="col-4 col-form-label">Email</label>
                  <input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="email (required)"
                    id="emailInput"
                    className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  />
                </div>
                <div className="form-group row input-group">
                  <label for="nameInput" className="col-4 col-form-label">Full Name</label>
                  <input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="name (first and last)"
                    id="nameInput"
                    className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  />
                </div>
                <div className="form-group row input-group">
                  <label for="countryInput" className="col-4 col-form-label">Country</label>
                <input
                  value={this.state.country}
                  onChange={this.handleInputChange}
                  name="country"
                  placeholder="country"
                  className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  id="countryInput"
                />
                </div>
                {/* if the user is an admin, they can choose the user type of the user they are creating, otherwise they will create a delegate */}
                {this.props.userType === "admin" ?
                  <div class="form-group row input-group">
                    <label for="userTypeSelect" className="col-4 col-form-label">User Type</label>
                    <select className="col-8 form-control border-top-2 border-left-2 border-right-2 border-dark rounded-0 px-2" value={this.state.userType} onChange={this.handleInputChange} name="userType">
                      <option value="admin">admin</option>
                      <option value="advisor">advisor</option>
                      <option value="staff">staff</option>
                      <option value="delegate">delegate</option>
                    </select>
                  </div> :
                  //empty div so advisors can't chose the usertype of the account they are creating
                  <div></div>}
                {/* if the user is an admin they can choose the school of the user they are creating, otherwise the school id will match */}
                {this.props.userType === "admin" ?
                  <div className="form-group row input-group">
                    <label for="schoolSelect" className="col-4 col-form-label">School</label>
                    <Select name="school" id="schoolSelect" options={this.state.schoolOptions} handleSelect={this.handleSelect} />
                  </div>:
                  <div></div>}
                <div className="form-group row input-group">
                <label for="committeeSelect" className="col-4 col-form-label">Committee</label>
                  <Select name="committee" id="committeeSelect" options={this.state.committeeOptions} handleSelect={this.handleSelect} />
                </div>
                <button
                  type="submit"
                  name="createDelegate"
                  onClick={this.handleFormSubmit}
                >Add User
            </button>
              </form>
              <div>
                {this.state.recentEmail !=="" ?  <p>Account Created for {this.state.recentName}, email sent to {this.state.recentEmail}</p> : <div/>}
              </div>
              </div>
              </div>
              {this.props.userType === "admin" ?
                <div className="row justify-content-around">
                  <form className="col-5">
                  <div className="form-group row input-group">
                    <input
                      value={this.state.committeeAddInput}
                      onChange={this.handleInputChange}
                      name="committeeAddInput"
                      placeholder="committee name"
                      id="committeeAddInput"
                      className ="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                    />
                  </div>
                    <button
                      type="submit"
                      name="addCommittee"
                      onClick={this.handleAddCommittee}
                    > Add Committee
                </button>
                  </form>
                  <form className="col-5">
                  <div className="form-group row input-group">
                    <input
                      value={this.state.schoolAddInput}
                      onChange={this.handleInputChange}
                      name="schoolAddInput"
                      placeholder="school name"
                      id="schoolAddInput"
                      className ="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                    />
                  </div>
                    <button
                      type="submit"
                      name="addSchool"
                      onClick={this.handleAddSchool}
                    > Add School
                  </button>
                  </form>
                </div> :
                <form>
                  <input
                    value={this.state.committeeAddInput}
                    onChange={this.handleInputChange}
                    name="committeeAddInput"
                    placeholder="committee name"
                  />
                  <button
                    type="submit"
                    name="addCommittee"
                    onClick={this.handleAddCommittee}
                  > Add Committee
                </button>
                </form>
              }

            </div>
        :
        <Redirect to="/" />
    )
  }

}
export default CreateUser;