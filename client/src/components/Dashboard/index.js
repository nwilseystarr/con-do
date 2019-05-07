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
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5">
                            <UserDashboard/>
                        </div>
                        <div className="col-lg-6">
                            <UpdatePassword/>
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