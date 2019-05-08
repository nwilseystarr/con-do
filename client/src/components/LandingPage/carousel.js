import React, { Component } from "react";
import image1 from "./conference-room.jpg";
import image2 from "./giant-conference.jpg";
import image3 from "./israeli-parliament.jpg";
import image4 from "./people-at-conference.jpg";
import image5 from "./people-in-meeting.jpg";
import image6 from "./people-in-row.jpg";
import "./style.css";


class Carousel extends Component {
    render() {
        return (
            <div className="container-fluid mt-5 carouselContainer">
                <div className="row">
                    <div className="col px-0">
                        <div id="carouselImages" className="carousel slide carousel-fade" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselImages" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselImages" data-slide-to="1"></li>
                                <li data-target="#carouselImages" data-slide-to="2"></li>
                                <li data-target="#carouselImages" data-slide-to="3"></li>
                                <li data-target="#carouselImages" data-slide-to="4"></li>
                                <li data-target="#carouselImages" data-slide-to="5"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={image1} className="d-block w-100" alt="..." height="650px" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p className="display-2 mb-0">con.DO</p>
                                        <h2>The Ultimate Conference App</h2>
                                        <a className="youtubeVid" href="/youtube"><i className="fab fa-youtube fa-4x"></i></a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image2} className="d-block w-100" alt="..." height="650px" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p className="display-2 mb-0">con.DO</p>
                                        <h2>The Ultimate Conference App</h2>
                                        <a className="youtubeVid" href="/youtube"><i className="fab fa-youtube fa-4x"></i></a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image3} className="d-block w-100" alt="..." height="650px" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p className="display-2 mb-0">con.DO</p>
                                        <h2>The Ultimate Conference App</h2>
                                        <a className="youtubeVid" href="/youtube"><i className="fab fa-youtube fa-4x"></i></a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image4} className="d-block w-100" alt="..." height="650px" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p className="display-2 mb-0">con.DO</p>
                                        <h2>The Ultimate Conference App</h2>
                                        <a className="youtubeVid" href="/youtube"><i className="fab fa-youtube fa-4x"></i></a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image5} className="d-block w-100" alt="..." height="650px" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p className="display-2 mb-0">con.DO</p>
                                        <h2>The Ultimate Conference App</h2>
                                        <a className="youtubeVid" href="/youtube"><i className="fab fa-youtube fa-4x"></i></a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image6} className="d-block w-100" alt="..." height="650px" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <p className="display-2 mb-0">con.DO</p>
                                        <h2>The Ultimate Conference App</h2>
                                        <a className="youtubeVid" href="/youtube"><i className="fab fa-youtube fa-4x"></i></a>
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselImages" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselImages" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Carousel;