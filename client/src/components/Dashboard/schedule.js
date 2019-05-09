import React, { Component } from "react";
import ReactTable from 'react-table';
import API from "../../utils/API";

class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            name: "",
            location: "",
            date: "",
            start: "",
            end: ""
        }
        this.getSchedule.bind(this);
    };

    getSchedule = () => {
        API.getScheduleByUser()
            .then(res => {
                // console.log(res)
                this.setState({
                    array: res.data
                });
            console.log(res)
            })
    }

    componentDidMount = () => { this.getSchedule(); }

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
                id:"date",
                Header: "date",
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
            }
        ]

        return (
            <div>
                <div className="col-lg-9 mt-5">
                    <ReactTable
                        columns={columns}
                        minRows={0}
                        data={this.state.array}
                    />
                </div>
            </div>
        )
    }
}
export default Schedule;