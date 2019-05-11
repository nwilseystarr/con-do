import React, { Component } from "react";
import API from "../../utils/API"

class CreateMeasure extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      measureType: "resolution"
    }

    
  }
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
        let voters = this.props.attendees.filter(attendee => (attendee.checkedIn === true && attendee.userType ==="delegate"))
        console.log(voters)
        //we will update our state to be the same as this array, and then use this array as the value for the attendance column of this 
        //event
        // this.setState({ attendance: attendance })
        // API.createMeasure({
        //   name: this.state.name,
        //   eventId: this.props.eventId,
        // })
        //   .then(res => {
        //     console.log(res);
        //   });
  }


    render() {

      
        return (
            <div className="container mt-5 pt-5">
              <div className="row justify-content-around">
                <div className="col-lg-8">
                  <h1 className="display-4 mb-4 mt-sm-5 text-center">Add New Measure</h1>
                  <form>
                    <div className="form-group row input-group">
                      <label for="nameInput" className="col-lg-2 col-sm-4 col-form-label px-0 ml-3">Measure Title</label>
                      <input
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        name="name"
                        placeholder="Measure Name"
                        className="col-lg-10 col-sm-8 form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-0 ml-3"
                        id="nameInput"
                      />
                    </div>
                    <select className="col-lg-10 col-sm-8 form-control border-dark rounded-0 px-0 ml-3" value={this.state.measureType} onChange={this.handleInputChange} name="measureType">
                        <option value="resolution">resolution</option>
                        <option value="procedural">procedural</option>
                    </select>
                    <button
                      className="btn btn-outline-dark px-3 mt-2 mb-5"
                      type="submit"
                      name="createEvent"
                      onClick={this.handleFormSubmit}
                    >
                      Add Measure
                    </button>
                  </form>
                </div>
              </div>
            </div>
        );
    }
}

export default CreateMeasure;