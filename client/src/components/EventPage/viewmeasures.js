import React, { Component } from "react";
import API from "../../utils/API"
import Measure from "./measure"
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import { BrowserRouter as Router, Link, } from 'react-router-dom';

let pullEventsInterval;
class ViewMeasures extends Component {
  constructor(){
    super()
    this.state = {
      measures: []
    }
    this.getMeasures = this.getMeasures.bind(this)
  }
  componentDidMount = ()=>{
    pullEventsInterval = setInterval(this.getMeasures, 5000, this.props.eventId)
  }
  componentWillUnmount = ()=>{
    clearInterval(pullEventsInterval)
    // console.log("component unmounting")
  }
  getMeasures = (eventId) =>{
    console.log("getting measuers")

      API.getMeasuresByEvent(eventId)
        .then(res =>{
          if (res.data.length > this.state.measures.length){
            this.setState({
              measures: res.data
            })
          }
        })
  }
  
    render() {
      const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true,   
        },
        {
            Header: 'Measure Type',
            id: 'measureType',
            accessor: 'measureType',
            filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["checkedIn"] }),
                filterAll: true,   
        },
        {
            Header: 'Result',
            id: 'result',
            accessor: measure => {
                // console.log(allSchools)
                // console.log(attendance)
                if(measure.result){
                    return "Passed!"
                }
                else{
                    return "Failed"
                }
            }, filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["schoolName"] }),
                filterAll: true,
        },{
          Header: 'Measure Detail',
          id: "measureDetail",
          accessor: measure =>{
            return <Link to={{ pathname: `/measure/${measure.id}` }}>View detail</Link>
          }
        }
    ]
      
        return (
          <ReactTable data={this.state.measures} columns={columns} defaultPageSize={10} filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}  minRows={0} 
          />
        );
    }
}

export default ViewMeasures;