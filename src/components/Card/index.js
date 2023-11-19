import React from "react";
import logo from "../../assets/logo.jpg";
import { Button, Row, Col, Card as BsCard } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaShareAlt } from 'react-icons/fa';

const Card = ({ jobData, setModal, setJobActiveId }) => {

    return (
        <BsCard className="my-2">
            <BsCard.Header>
                <Row className="justify-content-end">
                    <Button variant="light">
                        <FaFacebook size="1.5em" />
                    </Button>
                    <Button variant="light">
                        <FaTwitter size="1.5em" />
                    </Button>
                    <Button variant="light">
                        <FaShareAlt size="1.5em" />
                    </Button>
                </Row>
            </BsCard.Header>
            <BsCard.Body>
                <Row>
                    <Col md={2}>
                        <img src={logo} alt="logo" style={{ width: 120 }} />
                    </Col>
                    <Col md={10}>
                        <BsCard.Title>{jobData?.position}</BsCard.Title>
                        <BsCard.Text>
                            <span>{jobData?.company} | {jobData?.country} | {jobData?.experience}</span>
                            <br />
                            <span>Skills: {jobData?.skills.join(', ')}</span>
                        </BsCard.Text>
                    </Col>
                </Row>
            </BsCard.Body>
            <BsCard.Footer>
                <Row className="justify-content-end">
                    <Button onClick={_ => { setModal(true); setJobActiveId(jobData?._id) }} variant="primary">Apply</Button>
                </Row>
            </BsCard.Footer>
        </BsCard>
    )
}

export default Card