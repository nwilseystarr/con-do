import React, { Component } from "react";
import API from "../utils/API"
import { Link } from "react-router-dom";

class ProtectedPage extends Component {
  state = {
    email: "",
    name: "",
    userType: "",
  }
  componentDidMount(){
    this.loadUser();
  };

  loadUser = ()=>{
    API.getUser()
      .then(res =>
        this.setState({email: res.email, name: res.name, userType: res.userType})
      );
  }
    render(){
        return(
            <div className="App">
            <div className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <p>
              {this.state.email}
              {this.state.name}
              {this.state.userType}
            </p>
          </div>
        )
    }
}

export default ProtectedPage