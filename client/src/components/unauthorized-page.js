import React, { Component } from "react";
import Loading from "./Loading";
import Navbar from "./Navbar";

let loadingTimeout;
class UnauthorizedPage extends Component {
    constructor(){
        super()
        this.state ={
            renderError: false
        }             
    }
    
    //use loading icon whil state is update before displaying authentication error
    componentDidMount =  ()=>{
        loadingTimeout = setTimeout(function () {
        this.setState({
            renderError: true
        })
        }.bind(this), 5000)
        // loadingTimeout
    }
    componentWillUnmount = ()=>{
        clearTimeout(loadingTimeout)
    }       
    render() {
        return (
            <div>
            <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col text-center">
                    {this.state.renderError ?  <div><h1>401</h1> <h3>Not Authorized</h3></div>: <Loading/>}
                    </div>
                </div>
            </div>
                            
            </div>
        );
    }
}

export default UnauthorizedPage;