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
        console.log("getting user")
        API.getUser()
            .then(res => 
                this.setState({ name: res.data.name, country: res.data.country, school: res.data.school, role: res.data.school })
                )
                .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="card mt-5 border-0 text-center">
                <div className="card-body">
                    <h1 className="display-3">{this.state.name}</h1>
                    <p className="h3">{this.state.country}</p>
                    <p className="h5">{this.state.school}</p>
                    <i className="fas fa-qrcode fa-7x"></i>
                </div>
            </div>
        );
    }
}

export default UserDashboard;