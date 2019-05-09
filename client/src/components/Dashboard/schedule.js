import React, { Component } from "react";
import ReactTable from 'react-table';
import API from "../../utils/API";
import Axios from "axios";


class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Hello"
            // ,
            // location: "",
            // start: "",
            // end: ""
        };

        this.getSchedule.bind(this);
    };

    getSchedule = () => (
        // API.getScheduleByUser().then(res => {
        //     this.setState({allSchedule: res.data})
        // })

        API.getScheduleByUser()
            .then(res => {
                console.log(res)
                this.setState({
                    name: res.name,
                    // location: res.location,
                    // start: res.start,
                    // end: res.end
                });
            })
        
    )

    componentDidMount = () => { this.getSchedule(); }

    render() {
        const data = [{
            name: this.props.name,
            // location: this.props.location,
            // start: this.props.start,
            // end: this.props.end
        }]
        console.log(data);

        const columns = [
            {
                id: "name",
                Header: "event",
                accessor: data => data.name
            }
            // ,
            // {
            //     id: "location",
            //     Header: "location",
            //     accessor: data => data.location
            // },
            // {
            //     id: "start",
            //     Header: "event start",
            //     aaccessor: data => data.start
            // },
            // {
            //     id: "end",
            //     Header: "event end",
            //     accessor: data => data.end
            // }
        ]

        return (
                <div className="col-lg-9 mt-5">
                <ReactTable 
                    minRows = {0}
                    columns = {columns}
                    data = {data.rows}
                />
                    {/* <ReactTable
                        minRows = {0}
                        columns={columns}
                        // data={this.state.data} // should default to []
                        pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                        // loading={this.state.loading}
                        manual // informs React Table that you'll be handling sorting and pagination server-side
                        onFetchData={(state, instance) => {
                            // show the loading overlay
                            this.setState({ loading: true })
                            // fetch your data
                            Axios.put('http://localhost:3001/api/events/my', {
                                page: state.page,
                                pageSize: state.pageSize,
                                sorted: state.sorted,
                                filtered: state.filtered
                            })
                                .then((res) => {
                                    // Update react-table
                                    this.setState({
                                        data: res.data.rows,
                                        pages: res.data.pages,
                                        loading: false
                                    })
                                })
                        }}
                    /> */}
                </div>
        )
    }
}
export default Schedule;