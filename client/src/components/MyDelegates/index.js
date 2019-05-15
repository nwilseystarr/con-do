import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import API from "../../utils/API";
import Navbar from "../Navbar";
import MyUsers from "./userstable"

class MyDelegates extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props) {
    // console.log(props);
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>

        {/* For logged in admin/advisors, input fields for FULL NAME, EMAIL, & COUNTRY are available */}
    
          <div className="container-fluid mt-5 pt-5 createUserContainer">
            <div className="row justify-content-around">
              <div className="col-lg-12">
              <h1 className="display-4 mb-4">My Delegates</h1>
                <MyUsers />
              </div>
            </div>
          </div>
      </div>
    );
  }
}
export default MyDelegates;