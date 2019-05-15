import React, {Component} from "react";
// import { Link } from "react-router-dom";
import API from "../utils/API";
// import { derToJose } from "ecdsa-sig-formatter";
import Loading from "./Loading";
import Navbar from "./Navbar";
import UpdatePassword from "./Profile/update-password";

class Login extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor(props) {
        super(props)
        this.state ={
            loggedIn: false
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
                 
                    this.setState({loggedIn: true})
                });
    }
    componentDidMount = ()=>{
        this.loginUser();
    }
    render(){
        return(
        <div>
            <Navbar loggedIn={this.state.loggedIn} userType={this.props.userType}/>
              <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center mt-5">
                    {this.state.loggedIn ? <div><UpdatePassword/></div>: <Loading/>}
                    
                    </div>
                </div>
            </div>
        </div>
        )
    }
   
}
export default Login;