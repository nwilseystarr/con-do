import React, { Component } from "react";
import { Link } from "react-scroll";
import image1 from "./people-in-row.jpg";
import image2 from "./giant-conference.jpg";
import image3 from "./people-in-meeting.jpg";
import image4 from "./presenting.jpg";
import image5 from "./people-at-conference.jpg";
import "./style.css";


class Carousel extends Component {
    render() {
        return (
            <div className="container-fluid carouselContainer">
                <div className="row">
                    <div className="col px-0">
                        <div id="carouselImages" className="carousel slide carousel-fade" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselImages" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselImages" data-slide-to="1"></li>
                                <li data-target="#carouselImages" data-slide-to="2"></li>
                                <li data-target="#carouselImages" data-slide-to="3"></li>
                                <li data-target="#carouselImages" data-slide-to="4"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={image1} className="d-block vw-100 vh-100 carousel-img" alt="..." />
                                    <div className="carouselCaption">
                                        <h1 className="display-2">con.DO</h1>
                                        <h2 className="border-top border-bottom border-white">The Ultimate Conference App</h2>
                                        <a className="youtubeVid">
                                            <Link
                                                className="nav-link mr-3 pb-0 text-danger"
                                                activeClass="active-link"
                                                to="demo"
                                                smooth={true}
                                                spy={true}
                                                offset={-80}
                                                duration={500}
                                            >
                                                <i className="fab fa-youtube fa-5x"></i>
                                            </Link>
                                        </a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image2} className="d-block vw-100 vh-100 carousel-img" alt="..." />
                                    <div className="carouselCaption">
                                        <h1 className="display-2">con.DO</h1>
                                        <h2 className="border-top border-bottom border-white">The Ultimate Conference App</h2>
                                        <a className="youtubeVid">
                                            <Link
                                                className="nav-link mr-3 pb-0 text-danger"
                                                activeClass="active-link"
                                                to="demo"
                                                smooth={true}
                                                spy={true}
                                                offset={-80}
                                                duration={500}
                                            >
                                                <i className="fab fa-youtube fa-5x"></i>
                                            </Link>
                                        </a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image3} className="d-block vw-100 vh-100 carousel-img" alt="..." />
                                    <div className="carouselCaption">
                                        <h1 className="display-2">con.DO</h1>
                                        <h2 className="border-top border-bottom border-white">The Ultimate Conference App</h2>
                                        <a className="youtubeVid">
                                            <Link
                                                className="nav-link mr-3 pb-0 text-danger"
                                                activeClass="active-link"
                                                to="demo"
                                                smooth={true}
                                                spy={true}
                                                offset={-80}
                                                duration={500}
                                            >
                                                <i className="fab fa-youtube fa-5x"></i>
                                            </Link>
                                        </a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image4} className="d-block vw-100 vh-100 carousel-img" alt="..." />
                                    <div className="carouselCaption">
                                        <h1 className="display-2">con.DO</h1>
                                        <h2 className="border-top border-bottom border-white">The Ultimate Conference App</h2>
                                        <a className="youtubeVid">
                                            <Link
                                                className="nav-link mr-3 pb-0 text-danger"
                                                activeClass="active-link"
                                                to="demo"
                                                smooth={true}
                                                spy={true}
                                                offset={-80}
                                                duration={500}
                                            >
                                                <i className="fab fa-youtube fa-5x"></i>
                                            </Link>
                                        </a>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={image5} className="d-block vw-100 vh-100 carousel-img" alt="..." />
                                    <div className="carouselCaption">
                                        <h1 className="display-2">con.DO</h1>
                                        <h2 className="border-top border-bottom border-white">The Ultimate Conference App</h2>
                                        <a className="youtubeVid">
                                            <Link
                                                className="nav-link mr-3 pb-0 text-danger"
                                                activeClass="active-link"
                                                to="demo"
                                                smooth={true}
                                                spy={true}
                                                offset={-80}
                                                duration={500}
                                            >
                                                <i className="fab fa-youtube fa-5x"></i>
                                            </Link>
                                        </a>
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