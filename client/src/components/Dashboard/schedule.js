import React, { Component } from "react";
import ReactTable from 'react-table';
import API from "../../utils/API";
import AXIOS from "axios";


class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            location: "",
            start: "",
            end: ""
        };

        this.getSchedule.bind(this);
    };

    getSchedule = () => (
        // API.getScheduleByUser().then(res => {
        //     this.setState({allSchedule: res.data})
        // })

        API.getScheduleByUser()
            .then(res => {
                // console.log(res)
                this.setState({
                    name: res.name,
                    location: res.location,
                    start: res.start,
                    end: res.end
                });


            })

    )

    componentDidMount = () => { this.getSchedule(); }

    render() {
        const data = [{
            name: this.state.name,
            location: this.state.location,
            start: this.state.start,
            end: this.state.end
        }]
        console.log(data);

        const columns = [
            {
                id: "eventName",
                Header: "event",
                accessor: d => d.name
            },
            {
                id: "eventLocation",
                Header: "location",
                accessor: d => d.location
            },
            {
                id: "eventStart",
                Header: "event start",
                aaccessor: d => d.start
            },
            {
                id: "eventEnd",
                Header: "event end",
                accessor: d => d.end
            }
        ]

        return (
            <div>
                <div className="col-lg-9 mt-5">
                    <ReactTable
                        minRows={0}
                        data={this.state.data}
                        columns={columns}
                        onFetchData={(state, instance) => {
                            this.setState({ loading: true })
                            AXIOS.put("http://localhost:3001/api/events/userevents", {
                                name: state.name,
                                location: state.location,
                                start: state.start,
                                end: state.end
                            })
                                .then((res) => {
                                    // Update react-table
                                    this.setState({
                                        data: res.data.name,
                                        loading: false
                                    })
                                })
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default Schedule;