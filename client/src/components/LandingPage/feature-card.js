import React, { Component } from "react";

class FeatureCard extends Component {
    render() {
        return (
            <div className="container-fluid mt-5" id="features">
                <div className="row text-center">
                    <div className="col">
                        <h1 className="display-4 mb-3 ft-title">Key Features</h1>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-4">
                    <div className="col">
                        <div className="card-deck">
                            <div className="card border-0">
                                <div className="card-body text-center align-self-center">
                                    <i className="far fa-calendar-alt fa-7x mb-3"></i>
                                    <h3 className="card-title">Schedules</h3>
                                    <p className="card-text">Never miss an event ever again!  Through our app you'll be able to see a list of every event in one place.</p>
                                </div>
                            </div>
                            <div className="card border-0">
                                <div className="card-body text-center align-self-center">
                                    <i className="fas fa-qrcode fa-7x mb-3"></i>
                                    <h3 className="card-title">Attendance</h3>
                                    <p className="card-text">Have users check in to events quickly and securely with their own personal QR code! Utilize this information to know how many people have attended and who has attended each event!</p>
                                </div>
                            </div>
                            <div className="card border-0">
                                <div className="card-body text-center align-self-center">
                                    <i className="far fa-comments fa-7x mb-3"></i>
                                    <h3 className="card-title">In-App Chat</h3>
                                    <p className="card-text">Keep in the loop by staying in touch with everyone through our in-app messenging platform!</p>
                                </div>
                            </div>
                            <div className="card border-0">
                                <div className="card-body text-center align-self-center">
                                    <i className="fas fa-poll fa-7x mb-3"></i>
                                    <h3 className="card-title">Vote/Polls</h3>
                                    <p className="card-text">Quickly resolve issues, problems, or questions through our voting/poll feature-- it's never been easier to keep track of answers!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeatureCard;