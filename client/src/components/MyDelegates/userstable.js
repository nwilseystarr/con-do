import React, {Component} from "react";
import API from "../../utils/API";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import { Link } from "react-router-dom";


class UserSearch extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props){
    // console.log(props)
    super(props)
    this.state = {
      users: [],
      allCommittees: [],
      pageSize: 10
    }
  }
    
    //get all the options when the component first mounts
    componentDidMount = ()=>{
        API.getCommittees().then(res=>{
            this.setState({allCommittees: res.data})
        })
        API.getMyDelegates()
            .then(res=>{
                let usersTable = res.data.filter(user=> user.userType !== "advisor")
                this.setState({
                    users: usersTable
                })
            })
    } 
    render(){
        let allCommittees = this.state.allCommittees
  
        const columns = [
                    {
                        Header: "Name",
                        accessor: "name",
                        filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["name"] }),
                            filterAll: true,         
                            
                    },{
                        Header: "Email",
                        accessor: "email",
                        filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["email"] }),
                            filterAll: true
                    },{
                        Header: "Committee",
                        id: "committeeName",
                        accessor: user => {
                            // console.log(user)
                            if(user.committeeId){
                                return allCommittees.filter(committee => user.committeeId === committee.id)[0].name
                            }
                            else{
                                return null
                            }
                        }, filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["committeeName"] }),
                            filterAll: true,
                    },{
                        Header: "Country",
                        accessor: "country",
                        filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["country"] }),
                            filterAll: true
                    },
                    {
                        Header: "Profile Link",
                        id: "userLink",
                        accessor: user => <Link to={{ pathname: `/user/${user.id}` }}>View Detail</Link>
                  
                    }      
        ]
        return(
          
        <div>
            {/* results will be displayed here */}
                {this.state.allCommittees.length !==0 && this.state.users.length !== 0 ?
                    <ReactTable data={this.state.users} columns={columns} filterable
                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value} minRows="10" defaultPageSize="10"
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
export default UserSearch;