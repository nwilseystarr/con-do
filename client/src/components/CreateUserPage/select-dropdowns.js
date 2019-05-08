import React, { Component } from "react";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";

//This component will serve as a way of generating a select input with a passed array from a parent component
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            value: 1
        };
    }
    //passing the value back to the parent component when the prop first mounts   
    componentDidMount() {
        const data = {
            name: this.props.name,
            value: this.state.value
        }
        this.props.handleSelect(data)
    }
    //updating the options once they are received from the database
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            options: nextProps.options 
        });
    }
    //updating the value when a new option is selected
    handleInputChange = event => {
        this.setState({
            value: event.target.value
        });
        //the data to be passed back to the parent prop
        const data = {
            name: this.props.name,
            value: event.target.value
        };
        //this passes the updated value back to the parent component
        this.props.handleSelect(data);
    };
    render() {
        return (
            <select className="form-control border-dark rounded-0 px-0" value={this.state.value} name={this.props.name} onChange={this.handleInputChange}>
                {this.state.options.map(option => (<option value={option.id}>{option.name}</option>))}
            </select>
        )
    }
}

export default Select;