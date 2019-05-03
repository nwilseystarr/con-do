import React, { Component } from "react";
import LandingNavbar from "../components/LandingNavbar";
import AboutCard from "../components/AboutCard";

class AboutPage extends Component {
    render() {
        return (
            <div>
                <LandingNavbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 align-self-center">
                            <h1 className="display-3 d-none d-sm-none d-md-none d-lg-block d-xl-block">Meet</h1>
                            <h1 className="display-3 d-none d-sm-none d-md-none d-lg-block d-xl-block">The</h1>
                            <h1 className="display-3 d-none d-sm-none d-md-none d-lg-block d-xl-block">Team</h1>
                            <h1 className="display-4 d-xl-none d-lg-none text-center mt-5">Meet the Team</h1>
                        </div>
                        <div className="col">
                            <AboutCard />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default AboutPage;