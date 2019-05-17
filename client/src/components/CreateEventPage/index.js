import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import Select from "./select-dropdowns";
import Navbar from "../Navbar";
import AllSchedules from "./all-schedules";
import FormErrors from "../form-errors";
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
      committeeAddInput: "",
      committeeOptions: [],
      updateMe: 0,
      formErrors: { name: "", date: "", location: "" },
      nameValid: false,
      dateValid: false,
      locationValid: false,
      formValid: false
    };

    this.validateForm.bind(this);
  };

  //get all the options when the component first mounts
  componentDidMount = () => {
    this.getOptions();
  };

  getOptions = () => {
    API.getCommittees().then(res => {
      this.setState({
        committeeOptions: res.data
      });
    });
  };

  handleSelect = (selected) => {
    const name = selected.name
    const value = selected.value
    this.setState({
      [name]: value
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  };

  // Client-side Form Validation
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let dateValid = this.state.dateValid;
    let locationValid = this.state.locationValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '' : ' is too short!';
        break;
      case "date":
        dateValid = value.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/);
        fieldValidationErrors.date = dateValid ? '' : ' is not formatted correctly!';
        break;
      case "location":
        locationValid = value.length >=2;
        fieldValidationErrors.location = locationValid ? '' : ' is too short!';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      dateValid: dateValid,
      locationValid: locationValid
    }, this.validateForm);

  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.dateValid && this.state.locationValid });
  }

  //on submit we attempt to create a new event with the given values via the API that hits a route that queries our database
  handleFormSubmit = event => {
    event.preventDefault();
    //first we need to get all the users that have a committeeId that matches the committeId of the event we are creating
    API.getUsersByCommittee(this.state.committee)
      .then(response => {
        // console.log(response);
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
            this.setState((state) => ({ updateMe: state.updateMe + 1 }))
          });
      });
  }

  //handling submit for committee add
  handleAddCommittee = event => {
    event.preventDefault();
    if (this.state.committeeAddInput) {
      API.addCommittee({ name: this.state.committeeAddInput })
        .then(res => {
          // console.log(res);
          this.setState({
            committeeAddInput: ""
          });
          this.getOptions();
        });
    }
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType} />
        {this.props.userType === "admin" || this.props.userType === "advisor" ?
          <div className="container-fluid mt-5 mb-3 pt-5">
            <div className="row justify-content-around">
              <div className="col mt-4 border-right border-secondary">
                <h1 className="display-4 mb-4">Add New Event</h1>
                <div className="panel panel-default">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form>
                  <div className="form-group row input-group">
                    <label htmlFor="nameInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Event Title</label>
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
                    <label htmlFor="dateInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Date</label>
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
                    <label htmlFor="startInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Start Time</label>
                    <input
                      type="time"
                      value={this.state.start}
                      onChange={this.handleInputChange}
                      name="start"
                      // placeholder="HH:MM"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="startInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label htmlFor="endInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">End Time</label>
                    <input
                      type="time"
                      value={this.state.end}
                      onChange={this.handleInputChange}
                      name="end"
                      // placeholder="HH:MM"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="endInput"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label htmlFor="locationInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Location</label>
                    <input
                      value={this.state.location}
                      onChange={this.handleInputChange}
                      name="location"
                      placeholder="Location"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="locationInput"
                    />
                  </div>
                  <div className="form-row align-items-center mb-3">
                    <div className="col">
                      <label htmlFor="committeeSelect" className="col-form-label px-0">Committee</label>
                      <Select
                        className="ml-0"
                        name="committee"
                        id="committeeSelect"
                        options={this.state.committeeOptions}
                        handleSelect={this.handleSelect}
                      />
                    </div>
                    <div className="col mr-3">
                      <label htmlFor="committeeAddInput" className="col-form-label px-0 ml-3">Add Committee</label>
                      <div className="input-group">
                        <input
                          value={this.state.committeeAddInput}
                          onChange={this.handleInputChange}
                          name="committeeAddInput"
                          placeholder="Committee Name"
                          id="committeeAddInput"
                          aria-label="Input group example" aria-describedby="addCommitteeBtn"
                          className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn border-top-0 border-right-0 border-left-0 border-bottom border-dark rounded-0 px-1"
                            type="submit"
                            name="addCommittee"
                            id="addCommitteeBtn"
                            onClick={this.handleAddCommittee}
                          >
                            <i className="fas fa-plus-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-dark px-3 mt-2 mb-5"
                    type="submit"
                    name="createEvent"
                    disabled={!this.state.formValid}
                    onClick={this.handleFormSubmit}
                  >
                    Add Event
                  </button>
                </form>
              </div>
              <div className="col">
                <h1 className="display-4 mb-4 mt-4 pb-3">Added Events</h1>
                <AllSchedules key={this.state.updateMe} />
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