import React, {Component} from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API"
import { derToJose } from "ecdsa-sig-formatter";
import Loading from "../Loading"
import Navbar from "../Navbar";
// import UpdatePassword from "../Dashboard/update-password"
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Webcam from "./webcam"

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

    //calling the loginUser method of our API which routes to the backend and attempts to log in user agent via passport
    //with the given credentials
    getEvent = () =>{
            API.getSchools().then(res =>{
                this.setState({allSchools: res.data})
            })
            API.getCommittees().then(res=>{
                this.setState({allCommittees: res.data})
            })
            //this route will verify the json webtoken from the url paramater
            API.getEventById(this.props.match.params.id)
                .then(res => {
                    console.log(res)
                    res.data.attendance.map(attendanceRecord =>{
                        if (attendanceRecord.id === this.props.userId){
                            this.setState({
                                checkedIn: attendanceRecord.checkedIn
                            })
                        }
                    })
                    this.setState({
                        attendance: res.data.attendance,
                        name: res.data.name,
                        start: res.data.start,
                        location: res.data.location
                    })
                });
    }
    checkIn = (userId) =>{
        let currentAttendance = this.state.attendance
        let updatedAttendance = currentAttendance.map((attendanceRecord) => {
            if (attendanceRecord.id == userId){
                attendanceRecord.checkedIn = true
                this.setState({
                    recentlyCheckedIn: attendanceRecord.name + " is now checked in!"
                })
            }
            return attendanceRecord
        })
        console.log(updatedAttendance)
        let toSendAttendance = {attendance: updatedAttendance}
        API.checkIn(this.props.match.params.id, toSendAttendance)
            .then(res=>{
                console.log(res)
                this.getEvent()
            })
    }
    componentDidMount = ()=>{
        this.getEvent();
    }
    render(){
        let allSchools = this.state.allSchools
        let allCommittees = this.state.allCommittees
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
                    console.log(attendance)
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
                    console.log(allSchools)
                    console.log(attendance)
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
              <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-3 mt-5">
                    <h2>{this.state.name}</h2>
                    <h4>{this.state.start} | {this.state.location}</h4>
                    {!this.state.checkedIn ? <button onClick={this.checkIn}>Check in</button>:
                 <button disabled={true}>Checked In</button> }
                     <Webcam checkIn={this.checkIn}/>
                     <div>{this.state.recentlyCheckedIn}</div>
                    
                    </div>
                    <div className="col-lg-9 mt-5">
                    <ReactTable data={this.state.attendance} columns={columns} defaultPageSize={10} filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value} />
                    </div>
                </div>
            </div>
        </div>
        )
    }
   
}
export default Event;