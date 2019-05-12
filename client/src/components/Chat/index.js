import React, { Component } from "react";
import Navbar from "../Navbar";
import API from "../../utils/API";
import io from "socket.io-client";
const uuidv4 = require('uuid/v4');

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: " ",
            messages: []
        }
        this.socket = io("localhost:3001");

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });


        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            // ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        }
    };

    //Load all messages with the component
    componentDidMount() {
        this.getMessages();
    };

    //Get all messages from db 
    getMessages = () => {
        API.getMessage().then(res => {
            this.setState({
                messages: res.data
            });
            console.log(res.data)
        });
    };

    //handle input change function to update the field in real time 
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //handle submit to send to the backend
    handleFormSubmit = event => {
        event.preventDefault();
        API.postMessage({
            name: this.props.name,
            message: this.state.message
        })
        this.setState({
            message: ""
        })
        this.sendMessage();
    };

    //so users can press "enter" to send a message
    // onEnterPress = (e) => {
    //     if (e.keyCode == 13 && e.shiftKey == false) {
    //         e.preventDefault();
    //         this.handleFormSubmit.submit();
    //     }
    // }


    render() {
        return (
            <div className="container-fluid mt-5 pt-5">
                <Navbar loggedIn={this.props.loggedIn} />
                <form>
                    <textarea wrap="hard" name="message" id="message" className="form-control" placeholder="Your message here" value={this.state.message} onChange={this.handleInputChange}
                    // onKeyDown={this.onEnterPress} 
                    />
                    <button
                        className="btn btn-outline-dark px-3 mt-2 mb-5"
                        type="submit"
                        onClick={this.handleFormSubmit}
                    >
                        Send Message
                  </button>
                </form >
                <div className="border border-dark" key={uuidv4} >
                    {this.state.messages.map(message =>
                        <div>
                            {message.name}
                            <br></br>
                            {message.message}
                        </div>)}
                </div>
            </div >
        )
    }
};

export default Chat;

