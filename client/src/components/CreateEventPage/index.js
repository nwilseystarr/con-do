import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom"
import API from "../../utils/API"
import Select from "./select-dropdowns"

class CreateEvent extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      name: "",
      date: "delegate",
      start: "",
      end: "",
      group: "",
      location: "",
      attendance: "",
      committee: "",
      committeeOptions: [],
    }
  
  }
    
    //get all the options when the component first mounts
    componentDidMount = ()=>{
      this.getOptions();
    }
    getOptions = ()=>{
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
            API.getUsersByCommittee(this.state.committee)
              .then(response =>{
                console.log(response)
                let users = response.data
                let attendance = users.map((user)=> {
                  let attendingUser = user
                  attendingUser.checkedIn = false
                  return attendingUser
                })
                this.setState({attendance: attendance})
                 API.createEvent({
              name: this.state.name,
              date: this.state.date,
              start: this.state.start,
              end: this.state.end,
              group: this.state.group,
              location: this.state.location,
              attendance: this.state.attendance,
              committeeId: this.state.committee
            })
                .then(res => {
                  console.log(res)

                });
              })

           
          }

    render(){
    return (
      this.props.userType === "admin" || this.props.userType === "advisor" ?
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-lg-8">
              <h3>Add New Event</h3>
              <form>
                <div className="form-group row input-group">
                  <label for="nameInput" className="col-4 col-form-label">Event Name</label>
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
                  <label for="dateInput" className="col-4 col-form-label">Date</label>
                <input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="date"
                  placeholder="date"
                  className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  id="dateInput"
                />
                </div>
                <div className="form-group row input-group">
                  <label for="startInput" className="col-4 col-form-label">Start</label>
                <input
                  value={this.state.start}
                  onChange={this.handleInputChange}
                  name="start"
                  placeholder="start"
                  className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  id="startInput"
                />
                </div>
                <div className="form-group row input-group">
                  <label for="endInput" className="col-4 col-form-label">End</label>
                <input
                  value={this.state.end}
                  onChange={this.handleInputChange}
                  name="end"
                  placeholder="end"
                  className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  id="endInput"
                />
                </div>
                <div className="form-group row input-group">
                  <label for="groupInput" className="col-4 col-form-label">Group</label>
                <input
                  value={this.state.group}
                  onChange={this.handleInputChange}
                  name="group"
                  placeholder="group"
                  className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  id="groupInput"
                />
                </div>
                <div className="form-group row input-group">
                  <label for="locationInput" className="col-4 col-form-label">Location</label>
                <input
                  value={this.state.location}
                  onChange={this.handleInputChange}
                  name="location"
                  placeholder="location"
                  className="col-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                  id="locationInput"
                />
                </div>
                
                <div className="form-group row input-group">
                <label for="committeeSelect" className="col-4 col-form-label">Committee</label>
                  <Select name="committee" id="committeeSelect" options={this.state.committeeOptions} handleSelect={this.handleSelect} />
                </div>
                <button
                  type="submit"
                  name="createDelegate"
                  onClick={this.handleFormSubmit}
                >Add Event
            </button>
              </form>
              

            </div>
            </div>
            </div>
        :
        <Redirect to="/" />
    )
  }

}
export default CreateEvent;