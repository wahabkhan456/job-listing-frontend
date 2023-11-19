import React from "react";
import { Row, Col } from 'react-bootstrap';
import Play from "../../assets/play.png";
import Apple from "../../assets/apple.png";
import Facebook from "../../assets/facebook.png";
import Twitter from "../../assets/twitter.png";
import Instagram from "../../assets/instagram.png";
import MapImg from "../../assets/map.png";

const Footer = () => {
    return (
        <div className="p-3">
            <hr />
            <Row className="justify-content-center">
                <Col xs={4} md={2} className="padding-resp" style={{ paddingTop: ".3rem" }}>
                    <img src={Play} className="w-100 cursor-pointer" alt="play" />
                </Col>
                <Col xs={4} md={2} className="padding-resp">
                    <img src={Apple} className="w-100 cursor-pointer" alt="apple" />
                </Col>
                <Col xs={4} md={8}>
                    <div className="social-row float-right">
                        <p>Connect with us</p>
                        <img src={Facebook} className="mx-2 cursor-pointer" alt="facebook" />
                        <img src={Twitter} className="mx-2 cursor-pointer" alt="twitter" />
                        <img src={Instagram} alt="instagram" className="cursor-pointer" />

                    </div>
                </Col>

            </Row>
            <hr />

            <Row className="mb-3">
                <Col xs={6} md={3}>
                    <p className="h5">About Us</p>
                    <p className="cursor-pointer">Career</p>
                    <p className="cursor-pointer">Terms of use</p>
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">CA Privacy Policy</p>
                </Col>
                <Col xs={6} md={3}>
                    <p className="h5">Get Help</p>
                    <p className="cursor-pointer">Safety Centre</p>
                    <p className="cursor-pointer">Help and FAQS</p>

                </Col>
                <Col xs={12} md={6} style={{
                    backgroundImage: `url(${MapImg})`,
                    backgroundSize: '50% auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right top', 
                    backgroundColor: 'white'
                }}>
                    <p className="h5">Discover</p>
                    <p className="cursor-pointer">Home pay</p>
                    <p className="cursor-pointer">List your Bussiness</p>
                    <p className="cursor-pointer">Benefits program</p>
                    <p className="cursor-pointer">Become Affilate</p>

                </Col>



            </Row>
        </div>
    )
}

export default Footer;