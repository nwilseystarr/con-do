import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../utils/API"
import { derToJose } from "ecdsa-sig-formatter";
import Loading from "./Loading"

class Login extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor() {
        super()
        this.state = {

        }
        this.loginUser.bind(this)
    }

    //calling the loginUser method of our API which routes to the backend and attempts to log in user agent via passport
    //with the given credentials
    loginUser = () =>{
            //this route will verify the json webtoken from the url paramater
            API.loginViaLink(this.props.match.params.token)
                .then(res => {
                    //this route will log in the user via the passport authentication using the jswonwebtoken
                    API.loginUser({email: res.data.email, password: res.data.password})
                    //send the user to the page where they will configure their password
                    window.location.assign("/updatepassword")
                });
    }
    componentDidMount = ()=>{
        this.loginUser();
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Loading/>
                    </div>
                </div>
            </div>
        )
    }
   
}
export default Login;