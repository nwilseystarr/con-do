import React, { Component } from "react";
import API from "../../utils/API";
import QRCode from "qrcode";
import "./style.css";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            school: "",
            committee: "",
            country: "",
            role: ""
        };
    };

    componentDidMount() {
        this.getUserInfo();
    };

    getUserInfo = () => {
        API.getUser()
            .then(res => {
                this.setState({ id: res.data.id, name: res.data.name, country: res.data.country, role: res.data.userType });
                // console.log(res)
                let schoolId = res.data.schoolId;
                // console.log(schoolId)
                let committeeId = res.data.committeeId;
                
                API.getSchools()
                    .then(schoolRes => {
                        console.log(schoolRes)
                        this.setState({
                            school: schoolRes.data.filter(sch => sch.id === schoolId)[0].name
                        });
                    });
                
                API.getCommittees()
                    .then(committeeRes => {
                        this.setState({
                            committee: committeeRes.data.filter(comm => comm.id === committeeId)[0].name
                        });
                    });

                const opts = {
                    type: "image/png",
                };

                QRCode.toDataURL(" " + res.data.id, opts, function (err, url) {
                    if (err) throw err

                    let img = document.getElementById("image");
                    img.src = url;
                });
            });
    };

    render() {
        let imageStyle = {
            width: "300px"
        }
        return (
            <div className="card mt-5 border-0 text-center">
                <div className="card-body">
                    <h1 className="display-3">{this.state.name}</h1>
                    <p className="h3">{this.state.role}</p>
                    <p className="h3">{this.state.school}</p>
                    <p className="h4">{this.state.committee}</p>
                    <p className="h5">{this.state.country}</p>

                    <img id="image" style={imageStyle} alt="qr-rendered"/>
                </div>
            </div>
        );
    }
}

export default UserDashboard;