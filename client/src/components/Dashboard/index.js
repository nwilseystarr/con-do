import React, { Component } from "react";
// import API from "../../utils/API";
import Navbar from "../Navbar";
import UserDashboard from "./user";
import Schedule from "./schedule";
import { scheduled } from "rxjs";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar loggedIn={this.props.loggedIn} />
                <div className="container-fluid mt-5 pt-5">
                    <div className="row">
                        <div className="col-lg-5 align-self-center">
                            <UserDashboard />
                        </div>
                        <div className="col-lg-7 align-self-center mt-5">
                            <div className="container-fluid">
                                <div className="row">
                                    {this.props.userType === "admin" ?
                                        <div className="col d-flex justify-content-end mb-2">
                                            <a className="btn btn-outline-dark px-3 mr-2" href="/createuser"><i className="fas fa-user-plus mr-2"></i>Create User</a>
                                            <a className="btn btn-outline-dark px-3" href="/createevent"><i className="fas fa-plus mr-2"></i>Add Event</a>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>
                                <div className="row">
                                    {this.props.userType === "advisor" ?
                                        <div className="col d-flex justify-content-end mb-2">
                                            <a className="btn btn-outline-dark px-3 mr-2" href="/createuser"><i className="fas fa-user-plus mr-2"></i>Create Delegate</a>
                                            <a className="btn btn-outline-dark px-3" href="/createevent"><i className="fas fa-plus mr-2"></i>Add Event</a>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Schedule
                                        // {...this.props.loggedIn}
                                        name ={this.props.name}
                                        // location={this.props.location}
                                        // start={this.props.start}
                                        // end={this.props.end}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard; 