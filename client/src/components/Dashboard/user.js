import React, { Component } from "react";
import API from "../../utils/API";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            country: "",
            school: "",
            role: ""
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {
        API.getUser()
            .then(res => 
                this.setState({ name: res.name, country: res.country, school: res.school, role: res.school })
                )
                .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="card mt-5 border-0 text-center">
                <div className="card-body">
                    <h1 className="display-3">John Smith{this.state.name}</h1>
                    <p className="h3">COUNTRY{this.state.country}</p>
                    <p className="h5">School Name{this.state.school}</p>
                    <i className="fas fa-qrcode fa-7x"></i>
                </div>
            </div>
        );
    }
}

export default UserDashboard;