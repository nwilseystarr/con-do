import React, { Component } from "react";
import API from "../../utils/API"
import Navbar from "../Navbar";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import io from "socket.io-client";
import "./style.css";
// const uuidv4 = require("uuid/v4");

// let pullMeasureInterval;

class MeasureDetail extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            eventId: "",
            voteTally: [],
            result: "",
            measureType: "",
            open: "",
            allSchools: "",
            eventName: "",
            committeeName: "",
            pageSize: 10
        };

        const getMeasure = this.getMeasure.bind(this);

        this.socket = io("https://con-do.herokuapp.com/");
        this.socket.on("RECEIVE_MESSAGE", function (data) {
            setTimeout(getMeasure, 1000);
        });
        this.emit = ev => {
            this.socket.emit("SEND_MESSAGE", {});
        };
    };

    //this will get all of the relvant data for the event with the id that matches the id of the url paramater
    getMeasure = () => {
        // console.log("getting measure")
        //first we will get all of the school data
        API.getSchools().then(res => {
            this.setState({
                allSchools: res.data
            });
        });
        //then we will get the measure that has the same id as the url paramater
        API.getMeasureById(this.props.match.params.id)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    eventId: res.data.eventId,
                    voteTally: res.data.voteTally,
                    result: res.data.result,
                    measureType: res.data.measureType,
                    open: res.data.open
                });
                //then we will get the related event
                API.getEventById(res.data.eventId)
                    .then(eventRes => {
                        this.setState({
                            eventName: eventRes.data.name
                        });
                        //getting the committee that is related to that event
                        API.getCommitteById(eventRes.data.committeeId)
                            .then(committeeRes => {
                                this.setState({
                                    committeeName: committeeRes.data.name
                                });
                                //if voting is closed we will count the votes
                                if (!this.state.open) {
                                    //start affirmative at zero and count each delegate that voted yes
                                    let affirmative = 0;
                                    this.state.voteTally.forEach(delegateVote => {
                                        if (delegateVote.vote) {
                                            affirmative++;
                                        }
                                    });
                                    //if affirmative votes are more than half the votes, then the measure passed
                                    if (affirmative > (this.state.voteTally.length / 2)) {
                                        API.updateMeasure(this.state.id, { result: true });
                                        this.setState({result: res.data.result})
                                    }
                                    //otherwise it failed
                                    else {
                                        API.updateMeasure(this.state.id, { result: false });
                                        this.setState({result: res.data.result})
                                    }
                                }
                            });
                    });
            });
    };

    //admin can close voting
    closeVoting = () => {
        API.updateMeasure(this.state.id, { open: false })
            .then(res => {
                // console.log(res)
                // this.getMeasure()
            });
        this.emit();
    };

    //admin can open voting
    openVoting = () => {
        API.updateMeasure(this.state.id, { open: true })
            .then(res => {
                // console.log(res)
                // this.getMeasure()
            });
        this.emit();
    };

    //delegate casts a yes vote
    castYes = () => {
        //first make sure we have the most up to date voteTally
        API.getMeasureById(this.props.match.params.id)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    eventId: res.data.eventId,
                    voteTally: res.data.voteTally,
                    result: res.data.result,
                    measureType: res.data.measureType,
                    open: res.data.open
                });

                //get the current vote tally
                let currentVote = this.state.voteTally;

                //find the vote record that matches the user and update it's value to true
                let updatedVote = currentVote.map(delegateVote => {
                    if (delegateVote.id === this.props.id) {
                        delegateVote.vote = true;
                    }
                    return delegateVote;
                });

                //update the measure with the new voteTally
                API.updateMeasure(this.state.id, { voteTally: updatedVote })
                    .then(res => {
                        // console.log(res)
                        // this.getMeasure()
                    });
            });
        this.emit();
    };

    castNo = () => {
        //first make sure we have the most up to date voteTally
        API.getMeasureById(this.props.match.params.id)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    eventId: res.data.eventId,
                    voteTally: res.data.voteTally,
                    result: res.data.result,
                    measureType: res.data.measureType,
                    open: res.data.open
                });
                //get the current voteTally
                let currentVote = this.state.voteTally;

                //update the voter record for the current user
                let updatedVote = currentVote.map(delegateVote => {
                    if (delegateVote.id === this.props.id) {
                        delegateVote.vote = false;
                    }
                    return delegateVote;
                });

                //update the measure with the new vote tally
                API.updateMeasure(this.state.id, { voteTally: updatedVote })
                    .then(res => {
                        // this.getMeasure()
                    });
            });
        this.emit();
    };

    componentDidMount = () => {
        //setting an interval so the measure will be updated every 5 seconds
        // pullMeasureInterval = setInterval(this.getMeasure, 5000)
        this.getMeasure();
    };

    componentWillUnmount = () => {
        // clearInterval(pullMeasureInterval)
    };

    render() {
        //Our react table will use the voteTally array to populate its rows
        const columns = [
            {
                Header: "Name",
                accessor: "name",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true,
            },
            {
                Header: "Country",
                id: "countryName",
                accessor: "country",
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["countryName"] }),
                    filterAll: true,
            },
            {
                Header: "Votes",
                id: "delegateVote",
                accessor: delegateVote => {
                    if (delegateVote.vote) {
                        return "Yes"
                    }
                    else {
                        return "No"
                    }
                },
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["delegateVote"] }),
                    filterAll: true,
            }
        ];

        return (
            <div>
                <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType}/>
                <div className="container-fluid mt-5 pt-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 mt-5">
                            <h3 className="divTitle">Measure:</h3>
                            <h1 className="display-4"><b>{this.state.name} for {this.state.committeeName} during {this.state.eventName}</b></h1>
                            {/* if the user is admin or staff, they can open up/ close voting */}
                            {this.props.userType === "admin" || this.props.userType === "staff" ?
                                this.state.open ?
                                    <div>
                                        <button className="btn btn-outline-dark mb-3" onClick={this.closeVoting}>Close Voting</button>
                                    </div>
                                    :
                                    <div>
                                        <h5 className="mb-2">Voting Is Closed!</h5>
                                        <button className="btn btn-outline-dark mb-3" onClick={this.openVoting}>Open Voting</button>
                                    </div>
                                :
                                <div />
                            }

                            {/* Measure Pass/Fail Result */}
                            <div className="current-result mb-3">
                                <span className="h5 text-muted">Current Status: </span>
                                {this.state.result ?
                                    <span className="h5 measure-pass">Passed!</span>
                                    :
                                    <span className="h5 measure-fail">Failed!</span>
                                }
                            </div>


                            {/* if voting is open, then the delegate can vote */}
                            {this.state.open ?
                                <div>
                                    <button className="btn btn-outline-success mr-2 mb-2 px-3" onClick={this.castYes}>Vote Yes <i className="far fa-thumbs-up"></i></button>
                                    <button className="btn btn-outline-danger mb-2 px-3" onClick={this.castNo}>Vote No <i className="far fa-thumbs-down"></i></button>
                                </div>
                                :
                                <div>
                                    <button className="btn btn-outline-secondary mr-2 mb-2 px-3" disabled>Vote Yes <i className="far fa-thumbs-up"></i></button><button className="btn btn-outline-secondary mb-2 px-3" disabled>Vote No <i className="far fa-thumbs-down"></i></button></div>}
                            <ReactTable data={this.state.voteTally} columns={columns} defaultPageSize={10} filterable
                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value} minRows={0}
                                pageSize={this.state.pageSize}
                                onPageSizeChange={(pageSize, pageIndex) => {this.setState({pageSize: pageSize})}}  
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default MeasureDetail;