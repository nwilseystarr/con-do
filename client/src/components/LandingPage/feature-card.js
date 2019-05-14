import React, { Component } from "react";

class FeatureCard extends Component {
    render() {
        return (
            <div className="container-fluid" id="features">
                <div className="row snippetContainer mt-5 mb-4 text-center align-items-center flex-column pt-3">
                    <div className="col w-75 px-0 mb-3">
                        <h1 className="display-4 px-2 ">We <span className="underline">DO</span> Conferences &amp; Events</h1>
                    </div>
                    <div className="col">
                        <p className="lead">Let our mobile-friendly application help streamline your next conference or large-scale event, so that you can focus on the smaller things!</p>
                    </div>
                </div>
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
                {/* <div className="row justify-content-center align-items-center">
                    <div className="col-lg-3 px-0">
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
                    <div className="col-lg-3 px-0">
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
                    <div className="col-lg-3 px-0">
                        <div className="card border-0 mb-3">
                            <div className="row no-gutters">
                                <div className="col d-flex">
                                    <div className="card-body text-center align-self-center">
                                        <i className="far fa-comments fa-8x"></i>
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
                    <div className="col-lg-3 px-0">
                        <div className="card border-0 mb-3">
                            <div className="row no-gutters">
                                <div className="col d-flex">
                                    <div className="card-body text-center align-self-center">
                                        <i className="fas fa-poll fa-8x"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="card-title text-bold">Vote/Polls</h4>
                                        <p className="card-text">Record and track individual answers to a question or a poll.  </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default FeatureCard;