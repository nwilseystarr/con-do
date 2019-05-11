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
                // const opts = {
                //     type: 'image/jpeg',
                //     rendererOpts: {
                //     //   scale: 3,  
                //       width: 300
                //     }
                //   }
                // QRCode.toCanvas("" + res.data.id , opts, function(err, canvas){
                //     if (err) throw (err)
                    
                //     let container = document.getElementById('userQR')
                //     container.appendChild(canvas)
                // })
                // })
                // .catch(err => console.log(err));
                const opts = {
                    type: 'image/png',
                  }
                   
                  QRCode.toDataURL(''+ res.data.id, opts, function (err, url) {
                    if (err) throw err
                   
                    let img = document.getElementById('image')
                    img.src = url
                  })
            })     

    }

    render() {
        let imageStyle = {
            width: '300px'
        }
        return (
            <div className="card mt-5 border-0 text-center">
                <div className="card-body">
                    <h1 className="display-3">{this.state.name}</h1>
                    <p className="h3">{this.state.country}</p>
                    <p className="h5">{this.state.school}</p>
                    <img id="image" style={imageStyle}/>
                </div>
            </div>
        );
    }
}

export default UserDashboard;