import React, { Component } from "react";
import API from "../../utils/API";
import QRCode from "qrcode";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
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
        // console.log("getting user")
        API.getUser()
            .then(res =>{
                this.setState({ id: res.data.id, name: res.data.name, country: res.data.country, school: res.data.school, role: res.data.school });
                QRCode.toCanvas("" + res.data.id , function(err, canvas){
                    if (err) throw (err)
        
                    let container = document.getElementById('userQR')
                    container.appendChild(canvas)
                })
                })
                .catch(err => console.log(err));

    }

    render() {
        return (
            <div className="card mt-5 border-0 text-center">
                <div className="card-body">
                    <h1 className="display-3">{this.state.name}</h1>
                    <p className="h3">{this.state.country}</p>
                    <p className="h5">{this.state.school}</p>
                    {/* <i className="fas fa-qrcode fa-7x"></i>
                 */}
                    <div id="userQR"></div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;