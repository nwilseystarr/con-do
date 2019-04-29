import React, { Component } from "react";

class FeatureCard extends Component {
    render() {
        return (
            <div class="mt-5">
                <div class="row text-center">
                    <div class="col">
                        <p class="display-4">Features</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 px-0">
                        <div class="card border-0 mb-3">
                            <div class="row no-gutters">
                                <div class="col d-flex">
                                    <div class="card-body text-center align-self-center">
                                        <i class="far fa-calendar-alt fa-8x"></i>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body">
                                        <h4 class="card-title text-bold">Schedules</h4>
                                        <p class="card-text">Never miss an event ever again!  Through our app you'll be able to see a list of every event in one place.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 px-0">
                        <div class="card border-0 mb-3">
                            <div class="row no-gutters">
                                <div class="col d-flex">
                                    <div class="card-body text-center align-self-center">
                                        <i class="fas fa-qrcode fa-8x"></i>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body">
                                        <h4 class="card-title text-bold">Attendance</h4>
                                        <p class="card-text">Check in to your event quickly and securely with your own personal QR code!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-0 mb-3">
                            <div class="row no-gutters">
                                <div class="col d-flex">
                                    <div class="card-body text-center align-self-center">
                                        <i class="far fa-comments fa-8x mt-3"></i>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body">
                                        <h4 class="card-title text-bold">In-App Chat</h4>
                                        <p class="card-text">Keep in the loop by staying in touch with everyone through our in-app messenging platform!</p>
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