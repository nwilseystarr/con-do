import React, { Component } from "react";
import Navbar from "../Navbar";
import API from "../../utils/API";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    };

    //Load all messages with the component
    componentDidMount(){
        this.getMessages();
    };

    //Get all messages from db 
    getMessages = () => {
        API.getMessage().then(res => {
            this.setState({
                messages: res.data
                //.map over the messages to display
            });
        });
    };

    //handle input change function to update the field in real time 
    handleInputChange = event => {
        const { name, message } = event.target;
        this.setState({
            [name]: message
        });
    };

    //handle submit to send to the backend
    handleFormSubmit = event => {
        event.preventDefault();
        API.postMessage({
            name: this.params.name,
            message: this.state.message
        })
    };

    render() {
        return (
            <div className="container-fluid mt-5 pt-5">
                <Navbar />
                <form>
                    <textarea id="message" className="form-control" placeholder="Your message here" />
                    <button
                        className="btn btn-outline-dark px-3 mt-2 mb-5"
                        type="submit"
                        onClick={this.handleFormSubmit}
                    >
                        Send Message
                  </button>
                </form >
                <div>
                    where messages are shown
                </div>
            </div >
        )
    }
};

export default Chat;

