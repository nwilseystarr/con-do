import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import Select from "./select-dropdowns";
import Navbar from "../Navbar";
import AllSchedules from "./all-schedules"
import "./style.css";

class CreateEvent extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      name: "",
      date: "",
      start: "",
      end: "",
      group: "",
      location: "",
      attendance: "",
      committee: "",
      committeeOptions: [],
    };
  };

  //get all the options when the component first mounts
  componentDidMount = () => {
    this.getOptions();
  };

  getOptions = () => {
    API.getCommittees().then(res => {
      this.setState({ committeeOptions: res.data })
    })
  };

  handleSelect = (selected) => {
    const name = selected.name
    const value = selected.value
    this.setState({
      [name]: value
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //on submit we attempt to create a new event with the given values via the API that hits a route that queries our database
  handleFormSubmit = event => {
    event.preventDefault();
    //first we need to get all the users that have a committeeId that matches the committeId of the event we are creating
    API.getUsersByCommittee(this.state.committee)
      .then(response => {
        console.log(response);
        //then we will store this returned array in users
        let users = response.data;
        //we will map over this users array and give each one a new property checkedIn:false 
        let attendance = users.map((user) => {
          let attendingUser = user;
          attendingUser.checkedIn = false;
          return attendingUser;
        });
        //we will update our state to be the same as this array, and then use this array as the value for the attendance column of this 
        //event
        this.setState({ attendance: attendance })
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
            console.log(res);
          });
      });
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.props.loggedIn}/>
        {this.props.userType === "admin" || this.props.userType === "advisor" ?
          <div className="container mt-5 pt-5">
            <div className="row justify-content-around">
              <div className="col-lg-8">
                <h1 className="display-4 mb-4 mt-sm-5 text-center">Add New Event</h1>
                <form>
                  <div className="form-group row input-group">
                    <label for="nameInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Event Title</label>
                    <input
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      name="name"
                      placeholder="Event Name"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="nameInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label for="dateInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Date</label>
                    <input
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      name="date"
                      placeholder="MM/DD/YYYY"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="dateInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label for="startInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Start Time</label>
                    <input
                      value={this.state.start}
                      onChange={this.handleInputChange}
                      name="start"
                      placeholder="HH:MM"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="startInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label for="endInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">End Time</label>
                    <input
                      value={this.state.end}
                      onChange={this.handleInputChange}
                      name="end"
                      placeholder="HH:MM"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="endInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label for="groupInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Group</label>
                    <input
                      value={this.state.group}
                      onChange={this.handleInputChange}
                      name="group"
                      placeholder="Group"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="groupInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label for="locationInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Location</label>
                    <input
                      value={this.state.location}
                      onChange={this.handleInputChange}
                      name="location"
                      placeholder="Location"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="locationInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label for="committeeSelect" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Committee</label>
                    <Select 
                      name="committee" 
                      id="committeeSelect" 
                      options={this.state.committeeOptions} 
                      handleSelect={this.handleSelect} />
                  </div>
                  <button
                    className="btn btn-outline-dark px-3 mt-2 mb-5"
                    type="submit"
                    name="createEvent"
                    onClick={this.handleFormSubmit}
                  >
                    Add Event
                  </button>
                </form>
              </div>
              <div className="col">
                <AllSchedules/>
              </div>
            </div>
          </div>
          :
          <Redirect to="/" />
        }
      </div>
    )
  }
}

export default CreateEvent;