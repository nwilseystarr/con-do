import React, { Component } from "react";
import API from "../utils/API"
import { Link } from "react-router-dom";

class DefaultPage extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      name: "",
      userType: "",
    }
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
              {this.props.email}
              {this.props.name}
              {this.props.userType}
            </p>
          </div>
        )
    }
}

export default DefaultPage