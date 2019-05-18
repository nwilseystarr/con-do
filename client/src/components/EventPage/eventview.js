import React, { Component } from "react";
import API from "../../utils/API";
// import { derToJose } from "ecdsa-sig-formatter";
// import Loading from "../Loading";
import Navbar from "../Navbar";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Webcam from "./webcam";
import CreateMeasure from "./createmeasure";
import ViewMeasures from "./viewmeasures";
import UnauthorizedPage from "../unauthorized-page";
import "./style.css";

class Event extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor(props) {
        super(props);
        this.state = {
            attendance: [],
            name: "",
            start: "",
            location: "",
            checkedIn: false,
            recentlyCheckedIn: "",
            committeeId: "",
            allSchools: [],
            allCommittees: [],
            pageSize: 10
        };

        this.getEvent.bind(this);
        this.checkIn.bind(this);
    }

    //this will get all of the relevant data for the event with the id that matches the id of the url paramater
    getEvent = () => {
        //first we will get all of the school and committee data from the database
        API.getSchools().then(res => {
            this.setState({
                allSchools: res.data
            });
        });

        API.getCommittees().then(res => {
            this.setState({
                allCommittees: res.data
            });
        });

        API.getEventById(this.props.match.params.id)
            .then(res => {
                //when we get the event data, we will map over the attendance array to search for the record that has an id 
                //that matches the currently logged in user. Once we find that record, we will use it's checkedIn property to 
                //change our checkedIn state (the checkedIn state of the logged in user agent)
                res.data.attendance.map(attendanceRecord => {
                    if (attendanceRecord.id === this.props.userId) {
                        this.setState({
                            checkedIn: attendanceRecord.checkedIn
                        });
                    }
                });

                //then we will update the attendance state array with the value of the attendance array in the database
                this.setState({
                    attendance: res.data.attendance,
                    name: res.data.name,
                    start: res.data.start,
                    location: res.data.location,
                    committeeId: res.data.committeeId
                });
            });
    };

    //this function should only be called by the admin, with the userId paramater being provided by the qrCode of the delegate
    checkIn = (userId) => {
        //first we will store our current attendance by grabbing it from the state
        let currentAttendance = this.state.attendance;
        //then we will map through this array and return each attendance record into a new array
        //before we return the record, we will check to see if the record matches the id of the user who is 
        //requesting to check in. Once we find that record we will set its checkedIn property to true
        let updatedAttendance = currentAttendance.map((attendanceRecord) => {
            let id = parseInt(userId);
            if (attendanceRecord.id === id) {
                attendanceRecord.checkedIn = true;
                this.setState({
                    recentlyCheckedIn: attendanceRecord.name + " is now checked in!"
                });
            }
            return attendanceRecord;
        });

        //we will then create our request object using the updated attendance array and replace the attendance array for the event
        //in the database with the new attendance array
        let toSendAttendance = {
            attendance: updatedAttendance
        };

        API.checkIn(this.props.match.params.id, toSendAttendance)
            .then(res => {
                //call get event again so that the table will be updated with the most recent values
                this.getEvent();
            });

        //adding the newly checked in user to the voteTally
        API.getMeasuresByEvent(this.props.match.params.id)
            .then(measuresRes => {
                //get all measures for this event
                measuresRes.data.forEach(measure => {
                    //for a measure get it's current vote tally
                    let votes = measure.voteTally;
                    let id = parseInt(userId);
                    //check to see if the user who just checked in is already in the voteTally array
                    let filtered = votes.filter(vote => vote.id === id);
                    //if they are not in the vote tally, push them 
                    if (filtered.length === 0) {
                        //get the delegatesInfo from the attendance array
                        let delegateInfo = this.state.attendance.filter(delegate => delegate.id === id);
                        //if the user who attempted to check in is in the attendance array, push their info to the voteTally array
                        if (delegateInfo) {
                            votes.push({
                                id: delegateInfo[0].id,
                                name: delegateInfo[0].name,
                                country: delegateInfo[0].country,
                                vote: false
                            });
                        }
                    }
                    //push the new voteTally array to the measure
                    API.updateMeasure(measure.id, { voteTally: votes });
                });
            });
    };

    checkInButton = () => {
        //first we will store our current attendance by grabbing it from the state
        let currentAttendance = this.state.attendance;
        //then we will map through this array and return each attendance record into a new array
        //before we return the record, we will check to see if the record matches the id of the user who is 
        //requesting to check in. Once we find that record we will set its checkedIn property to true
        let updatedAttendance = currentAttendance.map((attendanceRecord) => {
            let id = this.props.userId;
            if (attendanceRecord.id === id) {
                attendanceRecord.checkedIn = true;
                this.setState({
                    recentlyCheckedIn: attendanceRecord.name + " is now checked in!"
                });
            }
            return attendanceRecord;
        });

        //we will then create our request object using the updated attendance array and replace the attendance array for the event
        //in the database with the new attendance array
        let toSendAttendance = { attendance: updatedAttendance };

        API.checkIn(this.props.match.params.id, toSendAttendance)
            .then(res => {
                //call get event again so that the table will be updated with the most recent values
                this.getEvent();
            });

        //adding the newly checked in user to the voteTally
        API.getMeasuresByEvent(this.props.match.params.id)
            .then(measuresRes => {
                //get all measures for this event
                measuresRes.data.forEach(measure => {
                    //for a measure get it's current vote tally
                    let votes = measure.voteTally;
                    //check to see if the user who just checked in is already in the voteTally array
                    let filtered = votes.filter(vote => vote.id === this.props.userId);
                    //if they are not in the vote tally, push them 
                    if (filtered.length === 0) {
                        //get the delegatesInfo from the attendance array
                        let delegateInfo = this.state.attendance.filter(delegate => delegate.id === this.props.userId);
                        //if the user who attempted to check in is in the attendance array, push their info to the voteTally array
                        if (delegateInfo) {
                            votes.push({
                                id: delegateInfo[0].id,
                                name: delegateInfo[0].name,
                                country: delegateInfo[0].country,
                                vote: false
                            });
                        }
                    }
                    //push the new voteTally array to the measure
                    API.updateMeasure(measure.id, { voteTally: votes });
                });
            });
    };

    componentDidMount = () => {
        this.getEvent();
    }

    render() {
        let allSchools = this.state.allSchools;
        //Our react table will use the attendance array from the current event to populate its data
        //each attendance record is a user object that has the following properties
        //name (str), checkedIn(bool), committeedId(key), schoolId(key)
        const columns = [
            {
                Header: "Name",
                accessor: "name",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true,
            },
            {
                Header: "Checked In",
                id: "checkedIn",
                accessor: attendance => {
                    // console.log(attendance)
                    if (attendance.checkedIn) {
                        return "yes"
                    }
                    else {
                        return "no"
                    }
                },
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["checkedIn"] }),
                filterAll: true,
            },
            {
                Header: "School",
                id: "schoolName",
                accessor: attendance => {
                    // console.log(allSchools)
                    // console.log(attendance)
                    if (attendance.schoolId) {
                        return allSchools.filter(school => attendance.schoolId === school.id)[0].name
                    }
                    else {
                        return null
                    }
                }, filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["schoolName"] }),
                filterAll: true,
            },
            {
                Header: "Country",
                id: "countryName",
                accessor: "country",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["committeeName"] }),
                filterAll: true,
            }
        ];

        return (
            <div>
                {/* if the user is and admin, advisor, or has a committeeId that matches the event, then they can access the page */}
                {this.props.userType === "admin" || this.props.userType === "advisor" || this.props.committeeId === this.state.committeeId ?
                    <div>
                        <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>
                        <div className="container-fluid mt-5 pt-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-3 mt-5">
                                    {/* event info */}
                                    <div class="eventDiv">
                                        <h1 className="display-4 event-name">{this.state.name}</h1>
                                        <h4 className="event-info"><span className="border-right border-secondary pr-3">{this.state.start}</span><span className="pl-3">{this.state.location}</span></h4>
                                        {/* checked in status of the current user */}
                                        <div className="btnDiv">
                                            {!this.state.checkedIn ?
                                                <div className="h5 mb-2 notChecked-status" onClick={this.checkInButton}>Not Checked In <i className="fas fa-times"></i></div>
                                                :
                                                <div className="h5 mb-2 checkedIn-status" disabled={true}>Checked In <i className="fas fa-check"></i></div>
                                            }

                                            {/*if the user is not a delegate, then they can check in other users  */}
                                            {this.props.userType === "admin" || this.props.userType === "advisor" || this.props.userType === "staff" ?
                                                <div>
                                                    <Webcam checkIn={this.checkIn} />
                                                    <div className="checkedin-msg h6">{this.state.recentlyCheckedIn}</div>
                                                </div>
                                                :
                                                <div></div>
                                            }

                                            <button className="btn btn-outline-danger btn-block mt-2" onClick={() => window.location.reload()}>Stop Check In</button>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="col mt-5">
                                    <h3 className="divTitle">Measures</h3>
                                    {/* if the user is not a delegate they can create measures */}
                                    {this.props.userType === "admin" || this.props.userType === "advisor" || this.props.userType === "staff" ?
                                        <CreateMeasure attendees={this.state.attendance} eventId={this.props.match.params.id} />
                                        :
                                        <div></div>
                                    }
                                    <ViewMeasures eventId={this.props.match.params.id} />
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                {/* if the user is not a delegate they can see attendance for event */}
                                {this.props.userType === "admin" || this.props.userType === "advisor" || this.props.userType === "staff" ?
                                    <div className="col-lg-9 mt-5">
                                        <h3 className="divTitle">Attendance</h3>
                                        {this.state.allSchools.length !== 0 && this.state.allCommittees.length !== 0 && this.state.attendance.length !== 0 ?
                                            <ReactTable data={this.state.attendance} columns={columns} defaultPageSize={10} filterable
                                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value} minRows={0}
                                                pageSize={this.state.pageSize}
                                                onPageSizeChange={(pageSize, pageIndex) => {this.setState({pageSize: pageSize})}}  
                                            />
                                            :
                                            <div></div>
                                        }
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>

                        </div>
                    </div>
                    :
                    <UnauthorizedPage {...this.props} />
                }
            </div>
        );
    }
}

export default Event;