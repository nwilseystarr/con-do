import React, {Component} from "react";
import { Link } from "react-router-dom";
// import {Redirect} from "react-router-dom";
// import API from "../../utils/API";
// import Select from "./select-dropdowns"

class UserRecord extends Component {
  //the signup state keeps track of all of the input fields in the signup form
    constructor(props){
        console.log("props", props)
        super(props)
    }s
    
    //get all the options when the component first mounts
    componentDidMount = ()=>{
 
    }

     render(){
        return(
          
        <div>
            <p>{this.props.name}</p>
        </div>
     
        )
    }
   
}
export default UserRecord;