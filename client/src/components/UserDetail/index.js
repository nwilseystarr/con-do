import React, { Component } from "react";
// import API from "../../utils/API";
// import matchSorter from "match-sorter";
import Navbar from "../Navbar";
import ReactTable from "react-table"
import API from "../../utils/API"

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            country: "",
            school: "",
            pageSize: 10
        };
    };

    getUser = () => {
        API.getMyDelegates()
            .then(res => {
                // console.log(res.data)
                let reqUserId = parseInt(this.props.match.params.id);
                let requestedUser = res.data.filter((user) => user.id === reqUserId);
                // console.log(requestedUser)
                requestedUser = requestedUser[0];
                let schoolName = this.state.schools.filter(school => school.id === requestedUser.schoolId)[0].name;
                let committeeName = this.state.committees.filter(committee => committee.id === requestedUser.committeeId)[0].name;
                this.setState({
                    id: requestedUser.id,
                    name: requestedUser.name,
                    country: requestedUser.country,
                    school: schoolName,
                    committee: committeeName
                });
                API.getEventsByCommitteeId(requestedUser.committeeId)
                    .then(res => {
                        this.setState({
                            userEvents: res.data
                        });
                    });
            });
    };

    componentDidMount = () => {
        API.getSchools().then(res => {
            this.setState({
                schools: res.data
            });
        });

        API.getCommittees().then(res => {
            this.setState({
                committees: res.data
            });
        });
        this.getUser()
    };

    render() {
        const columns = [
            {
                id: "name",
                Header: "Event",
                accessor: "name"
            },
            {
                id: "location",
                Header: "Location",
                accessor: "location"
            },
            {
                id: "date",
                Header: "Date",
                accessor: "date"
            },
            {
                id: "start",
                Header: "Event Start",
                accessor: "start"
            },
            {
                id: "end",
                Header: "Event End",
                accessor: "end"
            },
            {
                id: "checkedIn",
                Header: "Checked in?",
                accessor: event => {
                    let record = event.attendance.filter(record => record.id === this.state.id)[0]
                    console.log(record)
                    if (record.checkedIn) {
                        return <div>YES</div>
                    }
                    else {
                        return <div>NO</div>
                    }
                }
            }
        ];

        return (
            <div>
                <Navbar loggedIn={this.props.loggedIn} userType={this.props.userType} />
                <div className="container-fluid mt-5 pt-5">
                    <div className="card border-0 text-center">
                        <div className="card-body">
                            <h1 className="display-3">{this.state.name}</h1>
                            <p className="h3">{this.state.country}</p>
                            <p className="h5">{this.state.school}</p>
                            <p className="h5">{this.state.committee}</p>
                        </div>
                        {this.state.userEvents ?
                            <ReactTable
                                columns={columns}
                                minRows={0}
                                data={this.state.userEvents}
                                pageSize={this.state.pageSize}
                                defaultPageSize="10"
                                onPageSizeChange={(pageSize, pageIndex) => {this.setState({pageSize: pageSize})}}  
                            />
                            :
                            <div />
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default UserDetail; 