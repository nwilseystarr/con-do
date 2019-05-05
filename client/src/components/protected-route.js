import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from "../utils/API"

class ProtectedRoute extends Component {
    constructor() {
        super()
        // this.componentWillMount = this.componentWillMount.bind(this)
      }
    async componentWillMount(){
        let response = await API.getUser()
        let user = await response.data
        if(user){
          this.setState({
            email: user.email,
            name: user.name,
            userType: user.userType,
            loggedIn: true,
            permissions: user.permissions
          })
        }
      }
    render() {
      const { component: Component, ...props } = this.props
      // let userType = this.props.component.props.userType
      console.log(this.props)
      console.log(this)
      console.log(this.state)

      return (
        <Route 
          {...props} 
          render={props => (
            this.props.userType ==="admin" ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )} 
        />
      )
    }
  }

  export default ProtectedRoute