import React, { Component } from "react";
import API from "../../utils/API";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import { Link } from "react-router-dom";
import io from "socket.io-client";
// const uuidv4 = require("uuid/v4");

class ViewMeasures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measures: [],
      pageSize: 10
    };
    const getMeasures = this.getMeasures.bind(this);
    this.socket = io("https://con-do.herokuapp.com/");

    this.socket.on("RECEIVE_MESSAGE", function (data) {
      let eventId = data.eventId;
      setTimeout(getMeasures, 2000, eventId);
    });
  };

  componentDidMount = () => {
    this.getMeasures(this.props.eventId)
  };

  componentWillUnmount = () => {
    // clearInterval(pullEventsInterval)
  };

  getMeasures = (eventId) => {
    //pull all measures for the current event
    API.getMeasuresByEvent(eventId)
      .then(res => {
        //if there are new measures, then update the measures state
        if (res.data.length > this.state.measures.length) {
          this.setState({
            measures: res.data
          });
        }
      });
  };

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true,
      },
      {
        Header: "Measure Type",
        id: "measureType",
        accessor: "measureType",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["checkedIn"] }),
        filterAll: true,
      },
      {
        Header: "Result",
        id: "result",
        accessor: measure => {
          if (measure.result) {
            return "Passed!"
          }
          else {
            return "Failed"
          }
        }, filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["schoolName"] }),
        filterAll: true,
      }, 
      {
        Header: "Measure Detail",
        id: "measureDetail",
        accessor: measure => {
          return <Link to={{ pathname: `/measure/${measure.id}` }}>View detail</Link>
        }
      }
    ];

    return (
      this.state.measures.length !== 0 ?
        <ReactTable data={this.state.measures} columns={columns} defaultPageSize={10} filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value} minRows={0}
          pageSize={this.state.pageSize}
          onPageSizeChange={(pageSize, pageIndex) => { this.setState({ pageSize: pageSize }) }}
        />
        :
        <div />
    );
  }
}

export default ViewMeasures;