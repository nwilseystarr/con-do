import React, {Component} from "react";
// import { Link } from "react-router-dom";
import API from "../../utils/API"
// import { derToJose } from "ecdsa-sig-formatter";
// import Loading from "../Loading";
import Navbar from "../Navbar";
// import UpdatePassword from "../Dashboard/update-password"
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Webcam from "./webcam"
import CreateMeasure from "./createmeasure";

class Event extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor(props) {
        super(props)
        this.state = {
            attendance: [],
            name: "",
            start: "",
            location: "",
            checkedIn: false,
            recentlyCheckedIn: "",
            allSchools: [],
            allCommittees: [] 
        }
        this.getEvent.bind(this)
        this.checkIn.bind(this)
    }

    //this will get all of the relvant data for the event with the id that matches the id of the url paramater
    getEvent = () =>{
            //first we will get all of the school and committee data from the database
            API.getSchools().then(res =>{
                this.setState({allSchools: res.data})
            })
            API.getCommittees().then(res=>{
                this.setState({allCommittees: res.data})
            })
            
            API.getEventById(this.props.match.params.id)
                .then(res => {
                    //when we get the event data, we will map over the attendance array to search for the record that has an id 
                    //that matches the currently logged in user. Once we find that record, we will use it's checkedIn property to 
                    //change our checkedIn state (the checkedIn state of the logged in user agent)
                    res.data.attendance.map(attendanceRecord =>{
                        if (attendanceRecord.id === this.props.userId){
                            this.setState({
                                checkedIn: attendanceRecord.checkedIn
                            })
                        }
                    })
                    //then we will update the attendance state array with the value of the attendance array in the database
                    this.setState({
                        attendance: res.data.attendance,
                        name: res.data.name,
                        start: res.data.start,
                        location: res.data.location
                    })
                });
    }
    //this function should only be called by the admin, with the userId paramater being provided by the qrCode ofthe delegate
    checkIn = (userId) =>{
        //first we will store our current attendance by grabbing it from the state
        let currentAttendance = this.state.attendance
        //then we will map through this array and return each attendance record into a new array
        //before we return the record, we will check to see if the record matches the id of the user who is 
        //requesting to check in. Once we find that record we will set its checkedIn property to true
        let updatedAttendance = currentAttendance.map((attendanceRecord) => {
            let id = parseInt(userId)
            if (attendanceRecord.id === id){
                attendanceRecord.checkedIn = true
                this.setState({
                    recentlyCheckedIn: attendanceRecord.name + " is now checked in!"
                })
            }
            return attendanceRecord
        })
        console.log(updatedAttendance)
        //we will then create our request object using the updated attendance array and replace the attendance array for the event
        //in the database with the new attendance array
        let toSendAttendance = {attendance: updatedAttendance}
        API.checkIn(this.props.match.params.id, toSendAttendance)
            .then(res=>{
                //call get event again so that the table will be updated with the most recent values
                this.getEvent()
            })
    }
    checkInButton = () =>{
        //first we will store our current attendance by grabbing it from the state
        let currentAttendance = this.state.attendance
        //then we will map through this array and return each attendance record into a new array
        //before we return the record, we will check to see if the record matches the id of the user who is 
        //requesting to check in. Once we find that record we will set its checkedIn property to true
        let updatedAttendance = currentAttendance.map((attendanceRecord) => {
            let id = this.props.userId
            if (attendanceRecord.id === id){
                attendanceRecord.checkedIn = true
                this.setState({
                    recentlyCheckedIn: attendanceRecord.name + " is now checked in!"
                })
            }
            return attendanceRecord
        })
        console.log(updatedAttendance)
        //we will then create our request object using the updated attendance array and replace the attendance array for the event
        //in the database with the new attendance array
        let toSendAttendance = {attendance: updatedAttendance}
        API.checkIn(this.props.match.params.id, toSendAttendance)
            .then(res=>{
                //call get event again so that the table will be updated with the most recent values
                this.getEvent()
            })
    }
    componentDidMount = ()=>{
        this.getEvent();
    }
    render(){
        let allSchools = this.state.allSchools
        let allCommittees = this.state.allCommittees
        //Our react table will use the attendance array from the current event to populate its data
        //each attendance record is a user object that has the following properties
        // name (str), checkedIn(bool), committeedId(key), schoolId(key)
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["name"] }),
                    filterAll: true,   
            },
            {
                Header: 'Checked In',
                id: 'checkedIn',
                accessor: attendance =>{
                    // console.log(attendance)
                    if(attendance.checkedIn){
                        return "yes"
                    }
                    else{
                        return "no"
                    }
                },
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["checkedIn"] }),
                    filterAll: true,   
            },
            {
                Header: 'School',
                id: 'schoolName',
                accessor: attendance => {
                    // console.log(allSchools)
                    // console.log(attendance)
                    if(attendance.schoolId){
                        return allSchools[attendance.schoolId -1].name
                    }
                    else{
                        return null
                    }
                }, filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["schoolName"] }),
                    filterAll: true,
            },{
                Header: 'Committee',
                id: 'committeeName',
                accessor: attendance => {
                    if(attendance.committeeId){
                        return allCommittees[attendance.committeeId -1].name
                    }
                    else{
                        return null
                    }
                }, filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["committeeName"] }),
                    filterAll: true,
            }
        ]
        return(
        <div>
            <Navbar loggedIn={this.props.loggedIn}/>
              <div className="container-fluid p-5">
                <div className="row justify-content-center">
                    <div className="col-lg-3 mt-5">
                    <h2>{this.state.name}</h2>
                    <h4>{this.state.start} | {this.state.location}</h4>
                    {!this.state.checkedIn ? <button className="btn btn-outline-dark" onClick={this.checkInButton}>Check in</button>:
                 <button className="btn btn-outline-dark" disabled={true}>Checked In</button> }
                     <Webcam checkIn={this.checkIn}/>
                     <div>{this.state.recentlyCheckedIn}</div>
                    
                    </div>
                    <div className="col-lg-9 mt-5 p-5">
                    <CreateMeasure attendees={this.state.attendance} eventId={this.props.match.params.id}/>
                    <ReactTable data={this.state.attendance} columns={columns} defaultPageSize={10} filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}  minRows={0} 
                    />
                    </div>
                </div>
            </div>
        </div>
        )
    }
   
}
export default Event;