import React, { Component } from "react";

class FeatureCard extends Component {
    render() {
        return (
            <div className="container-fluid mt-5" id="features">
                <div className="row text-center">
                    <div className="col">
                        <h1 className="display-4 mb-3">Features</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 px-0">
                        <div className="card border-0 mb-3">
                            <div className="row no-gutters">
                                <div className="col d-flex">
                                    <div className="card-body text-center align-self-center">
                                        <i className="far fa-calendar-alt fa-8x"></i>
                                    </div>
                                </div>
                                <div className="col d-flex">
                                    <div className="card-body">
                                        <h4 className="card-title text-bold">Schedules</h4>
                                        <p className="card-text align-self-center">Never miss an event ever again!  Through our app you'll be able to see a list of every event in one place.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 px-0">
                        <div className="card border-0 mb-3">
                            <div className="row no-gutters">
                                <div className="col d-flex">
                                    <div className="card-body text-center align-self-center">
                                        <i className="fas fa-qrcode fa-8x"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="card-title text-bold">Attendance</h4>
                                        <p className="card-text">Check in to your event quickly and securely with your own personal QR code!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 px-0">
                        <div className="card border-0 mb-3">
                            <div className="row no-gutters">
                                <div className="col d-flex">
                                    <div className="card-body text-center align-self-center">
                                        <i className="far fa-comments fa-8x mt-3"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="card-title text-bold">In-App Chat</h4>
                                        <p className="card-text">Keep in the loop by staying in touch with everyone through our in-app messenging platform!</p>
                                    </div>
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