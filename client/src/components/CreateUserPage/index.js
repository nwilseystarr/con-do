import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import Select from "./select-dropdowns";
import UserSearch from "./UserSearch"
import Navbar from "../Navbar";
import FormErrors from "../form-errors";

class CreateUser extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props) {
    // console.log(props);
    super(props);
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
      schoolAddInput: "",
      updateMe: 0,
      formErrors: { name: "", email: "", country: "" },
      nameValid: false,
      emailValid: false,
      countryValid: false,
      formValid: false
    };

    this.validateForm.bind(this);
  }

  //get all the options when the component first mounts
  componentDidMount = () => {
    this.getOptions();
  }

  getOptions = () => {
    API.getSchools().then(res => {
      this.setState({
        schoolOptions: res.data
      });
    });

    API.getCommittees().then(res => {
      this.setState({
        committeeOptions: res.data
      });
    });
  };

  handleSelect = (selected) => {
    const name = selected.name;
    const value = selected.value;
    this.setState({
      [name]: value
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    },
    () => { this.validateField(name, value) });
  };

  // Client-side Form Validation
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let countryValid = this.state.countryValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '' : ' is too short!';
        break;
      case "email":
        emailValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        fieldValidationErrors.email = emailValid ? '' : ' please enter a valid email!';
        break;
      case "country":
        countryValid = value.length >=2;
        fieldValidationErrors.country = countryValid ? '' : ' is too short!';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      emailValid: emailValid,
      countryValid: countryValid
    }, this.validateForm);

  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.emailValid && this.state.countryValid });
  }

  //on submit we attempt to create a new user with the given values via the API that hits a route that queries our database
  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.email && this.state.name && this.state.userType) {
      //if an admin is creating the account, they will submit a value for each attribute
      if (this.props.userType === "admin") {
        API.createUser({
          email: this.state.email,
          name: this.state.name,
          userType: this.state.userType,
          country: this.state.country,
          schoolId: this.state.school,
          committeeId: this.state.committee
        })
          .then(userRes => {
            // console.log(userRes)
            this.setState({
              recentName: userRes.data.name,
              recentEmail: userRes.data.email,
              email: "",
              name: "",
              userType: "delegate",
              country: "",
            });
            //find all events that belong to the committee the new user belongs to
            API.getEventsByCommitteeId(userRes.data.committeeId)
              .then(eventsRes => {
                //store those events in an array
                let eventsArray = [...eventsRes.data];
                //for each event in that array
                eventsArray.forEach(event => {
                  //get it's attendance array
                  let currentAttend = event.attendance;
                  //add the new users attendance record the the attendance array
                  currentAttend.push({
                    id: userRes.data.id,
                    name: userRes.data.name,
                    email: userRes.data.email,
                    country: userRes.data.country,
                    schoolId: userRes.data.schoolId,
                    userType: userRes.data.userType,
                    checkedIn: false,
                    committeeId: userRes.data.committeeId
                  })
                  let toSendAtt = { attendance: currentAttend };
                  //push this new attendance array to the event's attendance column
                  API.addUserToAttendance(event.id, toSendAtt);
                  this.setState((state) => ({ updateMe: state.updateMe + 1 }));
                });
              });
          });
      }
      //if an advisor is creating the account, the will only submit certain values, the rest will be resolved in the route
      else {
        API.createUser({
          email: this.state.email,
          name: this.state.name,
          country: this.state.country,
          committeeId: this.state.committee
        })
          .then(userRes => {
            // console.log(userRes)
            this.setState({
              recentName: userRes.data.name,
              recentEmail: userRes.data.email,
              email: "",
              name: "",
              userType: "delegate",
              country: "",
            });
            //find all events that belong to the committee the new user belongs to
            API.getEventsByCommitteeId(userRes.data.committeeId)
              .then(eventsRes => {
                //store those events in an array
                let eventsArray = [...eventsRes.data];
                //for each event in that array
                eventsArray.forEach(event => {
                  //get it's attendance array
                  let currentAttend = event.attendance;
                  //add the new users attendance record the the attendance array
                  currentAttend.push({
                    id: userRes.data.id,
                    name: userRes.data.name,
                    email: userRes.data.email,
                    country: userRes.data.country,
                    firstLog: userRes.data.firstLog,
                    password: "$2a$10$D31bHm9Cvnd6vx0mjoU8u.1yFQvO5Ezi3jQat1yzWYnKJnVci5waW",
                    schoolId: userRes.data.schoolId,
                    userType: userRes.data.userType,
                    checkedIn: false,
                    createdAt: "2019-05-07T21:14:42.120Z",
                    updatedAt: "2019-05-07T21:14:42.120Z",
                    committeeId: userRes.data.committeeId
                  })
                  let toSendAtt = { attendance: currentAttend };
                  //push this new attendance array to the event's attendance column
                  API.addUserToAttendance(event.id, toSendAtt);
                  this.setState((state) => ({ updateMe: state.updateMe + 1 }));
                });
              });
          });
      }
    }
  };

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
  };

  handleAddSchool = event => {
    event.preventDefault();
    if (this.state.schoolAddInput) {
      API.addSchool({ name: this.state.schoolAddInput })
        .then(res => {
          // console.log(res);
          this.setState({
            schoolAddInput: ""
          });
          this.getOptions();
        });
    }
  };

  render() {
    return (
      <div>
        <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>

        {/* For logged in admin/advisors, input fields for FULL NAME, EMAIL, & COUNTRY are available */}
        {this.props.userType === "admin" || this.props.userType === "advisor" ?
          <div className="container-fluid mt-5 pt-5 createUserContainer">
            <div className="row justify-content-around">
              <div className="col border-right border-secondary">
                <h1 className="display-4 mb-4">Add New User</h1>
                <div>
                  {this.state.recentEmail !== "" ? <p>Account Created for {this.state.recentName}, email sent to {this.state.recentEmail}</p> : <div />}
                </div>
                <div className="panel panel-default">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form>
                  <div className="form-group row input-group">
                    <label htmlFor="nameInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Full Name</label>
                    <input
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      name="name"
                      placeholder="First and Last Name"
                      id="nameInput"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label htmlFor="emailInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Email</label>
                    <input
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      name="email"
                      placeholder="Email"
                      id="emailInput"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                    />
                  </div>
                  <div className="form-group row input-group">
                    <label htmlFor="countryInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Country</label>
                    <input
                      value={this.state.country}
                      onChange={this.handleInputChange}
                      name="country"
                      placeholder="Country"
                      className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                      id="countryInput"
                    />
                  </div>

                  {/* NESTED TERNARY OPERATOR FOR ONLY ADMIN TO SELECT USER TYPE */}
                  {/* if the user is an admin, they can choose the user type of the user they are creating, otherwise they will create a delegate */}
                  {this.props.userType === "admin" ?
                    <div class="form-group row input-group">
                      <label htmlFor="userTypeSelect" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">User Type</label>
                      <select className="col-lg-10 col-sm-8 form-control border-dark rounded-0 px-0 ml-3" value={this.state.userType} onChange={this.handleInputChange} name="userType">
                        <option value="admin">Admin</option>
                        <option value="advisor">Advisor</option>
                        <option value="staff">Staff</option>
                        <option value="delegate">Delegate</option>
                      </select>
                    </div>
                    :
                    //empty div so advisors can't chose the usertype of the account they are creating
                    <div></div>
                  }

                  {/* NESTED TERNARY OPERATOR FOR ADMIN TO BE ABLE TO ADD COMMITTEE/SCHOOL IF NOT ALREADY IN DB */}
                  {/* ADVISOR WILL ONLY BE ABLE TO ADD A COMMITTEE FOR A DELEGATE IF NOT ALREADY IN DB */}
                  {this.props.userType === "admin" ?
                    <div>
                      <form>
                        <div className="form-row align-items-center mb-3">
                          <div className="col">
                            <label htmlFor="committeeSelect" className="col-form-label px-0">Committee</label>
                            <Select
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
                      </form>
                      <form>
                        <div className="form-row align-items-center mb-3">
                          <div className="col">
                            {/* NESTED TERNARY OPERATOR */}
                            {/* if the user is an admin here's where they would choose the school that they just added OR select from db already for the user they are creating */}
                            {this.props.userType === "admin" ?
                              <div>
                                <label htmlFor="schoolSelect" className="col-lg-2 col-sm-4 col-form-label px-0">School</label>
                                <Select
                                  name="school"
                                  id="schoolSelect"
                                  options={this.state.schoolOptions}
                                  handleSelect={this.handleSelect}
                                />
                              </div>
                              :
                              // render nothing for any other usertype -- only admin can select the school for each user
                              <div></div>
                            }
                          </div>
                          <div className="col mr-3">
                            <label htmlFor="schoolAddInput" className="col-form-label px-0 ml-3">Add School</label>
                            <div className="input-group">
                              <input
                                value={this.state.schoolAddInput}
                                onChange={this.handleInputChange}
                                name="schoolAddInput"
                                placeholder="School Name"
                                id="schoolAddInput"
                                aria-label="Input group example" aria-describedby="addSchoolBtn"
                                className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn border-top-0 border-right-0 border-left-0 border-bottom border-dark rounded-0 px-1"
                                  type="submit"
                                  name="addSchool"
                                  id="addSchoolBtn"
                                  onClick={this.handleAddSchool}
                                >
                                  <i className="fas fa-plus-circle"></i>
                                </button>
                              </div>

                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    :
                    <form>
                      <div className="form-row align-items-center mb-3">
                        <div className="col">
                          <label htmlFor="committeeSelect" className="col-form-label px-0">Committee</label>
                          <Select
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
                    </form>
                  }
                  <button
                    className="btn btn-dark px-3 mt-2 mb-5"
                    type="submit"
                    name="createDelegate"
                    disabled={!this.state.formValid}
                    onClick={this.handleFormSubmit}
                  >
                    Add User
                  </button>
                </form>

              </div>
              <div className="col mb-5">
                <h1 className="display-4 mb-4 pb-3">Search Users</h1>
                <UserSearch key={this.state.updateMe} userType={this.props.userType} schoolId={this.props.schoolId} id={this.props.id} />
              </div>
            </div>
          </div>
          :
          <Redirect to="/" />
        }
      </div>
    );
  }
}
export default CreateUser;