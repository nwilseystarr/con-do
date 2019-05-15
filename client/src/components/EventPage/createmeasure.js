import React, { Component } from "react";
import API from "../../utils/API";
import io from "socket.io-client";
// const uuidv4 = require("uuid/v4");

class CreateMeasure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      measureType: ""
    };
    this.socket = io("https://con-do.herokuapp.com/");
    this.emit = ev => {
      this.socket.emit("SEND_MESSAGE", { eventId: this.props.eventId });
    };
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
    });
  };

  //on submit we attempt to create a new event with the given values via the API that hits a route that queries our database
  handleFormSubmit = event => {
    event.preventDefault();
    //first we will get all checked in delegates and store them in an array voters
    let voters = this.props.attendees.filter(attendee => (attendee.checkedIn === true && attendee.userType === "delegate"));
    //then we will map over this array, only returning the properties that we need, and adding the property vote, which is a boolean 
    //representing an affirmitive or negative vote
    voters = voters.map(voter => {
      return ({
        id: voter.id,
        name: voter.name,
        country: voter.country,
        vote: false
      });
    });

    //create the measure with the given arguments
    API.createMeasure({
      name: this.state.name,
      eventId: this.props.eventId,
      voteTally: voters,
      result: false,
      measureType: this.state.measureType,
      open: false
    })
      .then(res => {
        this.setState({
          name: ""
        });
      });
    this.emit();
    window.location.reload();
  };


  render() {
    return (
      <form className="form-inline mb-3">
        <div className="form-group row input-group">
          <input
            value={this.state.name}
            onChange={this.handleInputChange}
            name="name"
            placeholder="Measure Name"
            className="col form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-1 mx-3"
            id="nameInput"
          />
        </div>
        <select className="col form-control border-dark rounded-0 px-0 ml-3" value={this.state.measureType} onChange={this.handleInputChange} name="measureType">
          <option selected>Choose measure type...</option>
          <option value="resolution">resolution</option>
          <option value="procedural">procedural</option>
        </select>
        <button
          className="btn btn-outline-dark px-3 ml-3"
          type="submit"
          name="createEvent"
          onClick={this.handleFormSubmit}
        >
          Add Measure
        </button>
      </form>
    );
  }
}

export default CreateMeasure;