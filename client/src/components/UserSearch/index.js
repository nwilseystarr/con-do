import React, {Component} from "react";
import UserRecord from "./user-record"
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom"
import API from "../../utils/API"
// import Select from "./select-dropdowns"

class UserSearch extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      query: "",
      committeeIds: [],
      schoolIds: [],
      users: []
    }
    this.getUsers = this.getUsers.bind(this)
  }
    
    //get all the options when the component first mounts
    componentDidMount = ()=>{
 
    }
    //first get all the users with names similar to the query
    getUsers = (query) => {
        let usersArr = this.state.users
        API.getUsersByName(query)
            .then(res => {
                if(res.data[0] != "<"){
                    usersArr = res.data
                }
                console.log(usersArr)
                //get the ids of every committee with names similar to the query
                API.getCommitteeIds(query)
                    .then(res => {
                        if (res.data.length > 0) {
                            const mapped = res.data.map((committeeId => committeeId.id))
                            this.setState({
                                committeeIds: mapped
                            })
                            //get the users for every matching committee
                            this.state.committeeIds.forEach(committedId => {
                                API.getUsersByCommittee(committedId)
                                    .then(userObj => {
                                        usersArr.push(...userObj.data)
                                        //filtering our array of users for duplicates
                                        let userIds = []
                                        let finalUsers = usersArr.filter((user) => {
                                            if (userIds.includes(user.id)) {
                                                return false
                                            }
                                            else {
                                                userIds.push(user.id)
                                                return true
                                            }
    
                                        })
                                        this.setState({ users: finalUsers })
                                    })
                            })
                        }
                        else{
                            this.setState({
                                committeeIds: []
                            })
                        }
                        //get the ids of every school with names similar to the query
                        API.getSchoolIds(query)
                            .then(res => {
                                if (res.data.length > 0) {
                                    const mapped = res.data.map((school => school.id))
                                    this.setState({
                                        schoolIds: mapped
                                    })
                                    //get the users for every matching school
                                    this.state.schoolIds.forEach(schoolId => {
                                        API.getUsersBySchool(schoolId)
                                            .then(userObj => {
                                                usersArr.push(...userObj.data)
                                                //filtering our array of users for duplicates
                                                let userIds = []
                                                let finalUsers = usersArr.filter((user) => {
                                                    if (userIds.includes(user.id)) {
                                                        return false
                                                    }
                                                    else {
                                                        userIds.push(user.id)
                                                        return true
                                                    }
            
                                                })
                                                this.setState({ users: finalUsers })
                                            })
                                    })
                                }
                                else{
                                    this.setState({
                                        schoolIds: []
                                    })
                                }
                                //filtering our array of users for duplicates
                                let userIds = []
                                let finalUsers = usersArr.filter((user) => {
                                    if (userIds.includes(user.id)) {
                                        return false
                                    }
                                    else {
                                        userIds.push(user.id)
                                        return true
                                    }

                                })
                                this.setState({ users: finalUsers })

                            })
                    })
            }) 
    }
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
        this.getUsers(value)
    };
    //on submit we attempt to create a new user with the given values via the API that hits a route that queries our database
    handleFormSubmit = event =>{
        event.preventDefault();
      
        
    }
   
    render(){
        return(
          
        <div>
            <form>
                <input
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    name="query"
                    placeholder="Search Term"
                />
            </form>
            {/* results will be displayed here */}
            <div>
                {this.state.users.map((user)=> <UserRecord key={user.email} name={user.name}/>)}
            </div>
        </div>
     
        )
    }
   
}
export default UserSearch;