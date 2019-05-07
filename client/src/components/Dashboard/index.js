import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar";
import UserDashboard from "./user";
import UpdatePassword from "./update-password";
import Schedule from "./schedule";

class Dashboard extends Component {
    render() {
        return(
            <div>
                <Navbar loggedIn={this.props.loggedIn}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5">
                            <UserDashboard/>
                        </div>
                        <div className="col-lg-6">
                            <UpdatePassword/>
                            {this.props.userType ==="admin" ? 
                            <div>
                                <a className="btn btn-outline-dark px-3" href="createuser">Create User</a>
                                <a className="btn btn-outline-dark px-3" href="event/add">Add Event</a>
                                <a className="btn btn-outline-dark px-3" href="schedule">View Schedule</a>
                            </div>
                            : 
                            <div>
                                <a className="btn btn-outline-dark px-3" href="schedule">View Schedule</a>
                            </div>}
                            
                        </div>
                        <div className="col-lg-6">
                            <Schedule />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard; 