import React, {Component} from "react";
// import { Link } from "react-router-dom";
import Navbar from "./Navbar";
// import { derToJose } from "ecdsa-sig-formatter";
import UpdatePassword from "./Profile/update-password";

class UpdatePasswordPage extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor(props) {
        super(props)
        this.state ={
        }
    }


    render(){
        return(
        <div>
            <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>
              <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center mt-5">
                    <h4>Please set your password before continuing</h4>
                    <div><UpdatePassword/></div>
                    
                    </div>
                </div>
            </div>
        </div>
        )
    }
   
}
export default UpdatePasswordPage;