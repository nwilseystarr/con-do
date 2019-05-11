import React, {Component} from "react";
import API from "../../utils/API"
import Navbar from "../Navbar";

let pullMeasureInterval;

class MeasureDetail extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            eventId: "",
            voteTally: "",
            result: "",
            measureType: "",
            open: "",
            allSchools: "",
            eventName: "",
            committeeName: ""
        }

    }

    //this will get all of the relvant data for the event with the id that matches the id of the url paramater
    getMeasure = () =>{
            //first we will get all of the school and committee data from the database
            API.getSchools().then(res =>{
                this.setState({allSchools: res.data})
            })
   
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
                    })
                    API.getEventById(res.data.eventId)
                        .then(eventRes =>{
                            this.setState({
                                eventName: eventRes.data.name
                            })
                            API.getCommitteById(eventRes.data.committeeId)
                                .then( committeeRes=>{
                                    this.setState({
                                        committeeName: committeeRes.data.name
                                    })
                                    if(!this.state.open){
                                        let affirmative = 0
                                        this.state.voteTally.forEach(delegateVote =>{
                                            if (delegateVote.vote){
                                                affirmative++
                                            }
                                        })
                                        if(affirmative > (this.state.voteTally.length/2)){
                                            API.updateMeasure(this.state.id, {result: true})
                                        }
                                        else{
                                            API.updateMeasure(this.state.id, {result: false})
                                        }
                                    }
                                })
                        })
                });
    }
    closeVoting = ()=>{
        API.updateMeasure(this.state.id, {open: false})
            .then(res =>{
                console.log(res)
                this.getMeasure()

            })
            
    }
    openVoting = ()=>{
        API.updateMeasure(this.state.id, {open: true})
            .then(res =>{
                console.log(res)
                this.getMeasure()
            })       
    }
    castYes = ()=>{
        let currentVote = this.state.voteTally
        let updatedVote = currentVote.map(delegateVote =>{
            if(delegateVote.id === this.props.userId){
                delegateVote.vote = true
            }
            return delegateVote
        })
        console.log(updatedVote)
        API.updateMeasure(this.state.id, {voteTally: updatedVote})
        .then(res =>{
            console.log(res)
            this.getMeasure()
        })     
    }
    castNo = ()=>{
        let currentVote = this.state.voteTally
        let updatedVote = currentVote.map(delegateVote =>{
            if(delegateVote.id === this.props.userId){
                delegateVote.vote = false
            }
            return delegateVote
        })
        console.log(updatedVote)
        API.updateMeasure(this.state.id, {voteTally: updatedVote})
        .then(res =>{
            console.log(res)
            this.getMeasure()
        })     
    }
    
    componentDidMount = ()=>{
        pullMeasureInterval = setInterval(this.getMeasure, 10000)
        this.getMeasure();
    }
    componentWillUnmount = ()=>{
        clearInterval(pullMeasureInterval)
    }
    render(){
        let allSchools = this.state.allSchools
        let allCommittees = this.state.allCommittees
        //Our react table will use the attendance array from the current event to populate its data
        //each attendance record is a user object that has the following properties
        // name (str), checkedIn(bool), committeedId(key), schoolId(key)
        // const columns = [
        //     {
        //         Header: 'Name',
        //         accessor: 'name',
        //         filterMethod: (filter, rows) =>
        //         matchSorter(rows, filter.value, { keys: ["name"] }),
        //             filterAll: true,   
        //     },
        //     {
        //         Header: 'Checked In',
        //         id: 'checkedIn',
        //         accessor: attendance =>{
        //             // console.log(attendance)
        //             if(attendance.checkedIn){
        //                 return "yes"
        //             }
        //             else{
        //                 return "no"
        //             }
        //         },
        //         filterMethod: (filter, rows) =>
        //         matchSorter(rows, filter.value, { keys: ["checkedIn"] }),
        //             filterAll: true,   
        //     },
        //     {
        //         Header: 'School',
        //         id: 'schoolName',
        //         accessor: attendance => {
        //             // console.log(allSchools)
        //             // console.log(attendance)
        //             if(attendance.schoolId){
        //                 return allSchools[attendance.schoolId -1].name
        //             }
        //             else{
        //                 return null
        //             }
        //         }, filterMethod: (filter, rows) =>
        //         matchSorter(rows, filter.value, { keys: ["schoolName"] }),
        //             filterAll: true,
        //     },{
        //         Header: 'Country',
        //         id: 'countryName',
        //         accessor: 'country',
        //         filterMethod: (filter, rows) =>
        //         matchSorter(rows, filter.value, { keys: ["committeeName"] }),
        //             filterAll: true,
        //     }
        // ]
        return(
        <div>
            <Navbar loggedIn={this.props.loggedIn}/>
              <div className="container-fluid p-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10 mt-5">
                    <h3>Measure: {this.state.name} for {this.state.committeeName} during {this.state.eventName}</h3>
                    {/* if the user is admin or staff, they can open up/ close voting */}
                    {this.props.userType === "admin" || this.props.userType === "staff" ? 
                        this.state.open ? 
                            <div>
                                <button onClick={this.closeVoting}>Close Voting</button>
                            </div>
                        :
                            <div>
                                <button onClick={this.openVoting}>Open Voting</button>
                            </div>
                    : 
                        <div/>
                    }
                   
                    {this.state.result ? <div>Passed!</div>: <div>Failed!</div>}
                    {this.state.open ? 
                    <div>
                        <button onClick={this.castYes}>Vote Yes</button>
                        <button onClick={this.castNo}>Vote No</button>
                    </div>
                    :
                    <div>
                        <h5>Voting Closed!</h5>
                        <button disabled>Vote Yes</button><button disabled>Vote No</button></div>}
                    {/* <ReactTable data={this.state.attendance} columns={columns} defaultPageSize={10} filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}  minRows={0} 
                    /> */}
                    </div>
                </div>
            </div>
        </div>
        )
    }
   
}
export default MeasureDetail;