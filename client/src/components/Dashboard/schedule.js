import React, { Component } from "react";
import ReactTable from 'react-table';
// import matchSorter from 'match-sorter';
import API from "../../utils/API"


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
        
        API.getScheduleByUser(this.props.id)
            .then(res => {
                console.log(res)
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
        
        const columns = [
            {
                id: "eventName",
                Header: "event",
                accessor: data => data.name
            },
            {   
                id: "eventLocation",
                Header: "location",
                accessor: data => data.location
            },
            {
                id: "eventStart",
                Header: "event start",
                aaccessor: data => data.start
            },
            {
                id: "eventEnd",
                Header: "event end",
                accessor: data => data.end
            }
        ]
        
        return (
            <div>
                <div className="col-lg-9 mt-5">
                    <ReactTable
                        minRows = {0}
                        data={data}
                        columns = {columns}
                        />
                </div>
            </div>
        )
    }
}
export default Schedule;