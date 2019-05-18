import React, { Component } from "react";
import ReactTable from "react-table";
import API from "../../utils/API";
import { Link } from "react-router-dom";


class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            name: "",
            location: "",
            committee: "",
            date: "",
            start: "",
            end: "",
            pageSize: 10
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
            // console.log(res)
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
            }, {
                id: "eventLink",
                Header: "Event Link",
                accessor: event => {if (event.committeeId !== 1000) {
                    return <Link to={{ pathname: `/event/${event.id}` }}>View Detail</Link>}
                }
                    
            }
        ]

        return (
            <div>
                {this.state.array.length !==0 ?
                    <ReactTable
                        columns={columns}
                        minRows={0}
                        data={this.state.array}
                        pageSize={this.state.pageSize}
                        onPageSizeChange={(pageSize, pageIndex) => {this.setState({pageSize: pageSize})}}  
                    />
                :
                <div/>
                }
            </div>
        )
    }
}
export default Schedule;