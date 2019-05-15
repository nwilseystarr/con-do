import React, { Component } from "react";
import API from "../../utils/API";
import QRCode from "qrcode";
import "./style.css";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {

        const opts = {
            type: "image/png",
        }

        QRCode.toDataURL(" " + this.props.id, opts, function (err, url) {
            if (err) throw err

            let img = document.getElementById("image")
            img.src = url
        })

    }

    render() {
        let imageStyle = {
            width: "300px"
        }
        return (
            <div className="card mt-5 border-0 text-center">
                <div className="card-body">
                    <h1 className="display-4 user-name">{this.props.name}</h1>
                    <h3 className="user-type">{this.props.userType}</h3>
                    <img id="image" style={imageStyle} />
                </div>
            </div>
        );
    }
}

export default UserDashboard;