import React, { Component } from "react";
import Navbar from "../Navbar";

class Chat extends Component {
    constructor() {
        super()

    }
//handle input change function to update the field in real time 
//handle submit to send to the backend

//.map over the messages to display

    render() {
        return (
            <div className="container-fluid mt-5 pt-5">
                <Navbar />
                <form>
                    <input id="name" class="form-control" placeholder="Name" />
                    <textarea id="message" class="form-control" placeholder="Your message here" />
                    <button
                    className="btn btn-outline-dark px-3 mt-2 mb-5"
                    type="submit"
                    onClick={this.handleFormSubmit}
                  >
                    Send Message
                  </button>
                </form >
            </div >
        )
    }
};

export default Chat;

