import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../Navbar";
import UserDashboard from "./user";

class Dashboard extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 text-center border-0">
                            <UserDashboard/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard; 