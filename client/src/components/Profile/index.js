import React, { Component } from "react";
// import API from "../../utils/API";
import Navbar from "../Navbar";
import UserDashboard from "../Dashboard/user";
import UpdatePassword from "./update-password";

class Profile extends Component {
    render() {
        return(
            <div>
                <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>
                <div className="container-fluid mt-5 pt-5">
                    <div className="row">
                        <div className="col-lg-5 align-self-center">
                            <UserDashboard/>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <UpdatePassword/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile; 