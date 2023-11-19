import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col, InputGroup, Form, FormControl, Spinner, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from "../../components/Card";

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [originalJobs, setOriginalJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [advanceFilteredJobs, setAdvanceFilteredJobs] = useState([]);
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [jobActiveId, setJobActiveId] = useState("");
    const advanceFilter1 = useRef(null);
    const advanceFilter2 = useRef(null);

    useEffect(() => {
        (async _ => {
            try {
                setLoader(true);
                const jobsJSON = await fetch('http://localhost:5000/jobs');
                const jobsData = await jobsJSON.json();
                setLoader(false);
                setJobs(jobsData);
                setOriginalJobs(jobsData);
            } catch (err) {
                setLoader(false);
                console.log(err);
            }
        })()
    }, []);

    const searchData = text => {
        if (!!text) {
            let jobsClone = !!jobs.length ? [...jobs] : !!filteredJobs.length ? [...filteredJobs] : [...originalJobs];
            let searchedJobs = jobsClone.filter(job => (
                job?.position?.toLowerCase().startsWith(text.toLowerCase())
                || job?.company?.toLowerCase().startsWith(text.toLowerCase())
                || job?.country?.toLowerCase().startsWith(text.toLowerCase())
                || job?.type?.toLowerCase().startsWith(text.toLowerCase())
            ));
            setJobs(searchedJobs);
        } else {
            setJobs(!!filteredJobs.length ? filteredJobs : originalJobs);
        }
    }

    const filterData = text => {
        if (text !== "All") {
            let jobsClone = !!advanceFilteredJobs.length ? [...advanceFilteredJobs] : [...originalJobs];
            let searchedJobs = jobsClone.filter(job => job?.type?.toLowerCase() === text.toLowerCase());
            setJobs(searchedJobs);
            setFilteredJobs(searchedJobs);
        } else {
            setFilteredJobs([]);
            setJobs(!!advanceFilteredJobs.length ? advanceFilteredJobs : originalJobs);
        }
    }

    const advanceFilterData = (value, selectedIndex, filterType) => {
        if (selectedIndex !== 0) {
            let jobsClone = (
                !!advanceFilteredJobs.length
                && (
                    filterType === 1 ? advanceFilter2?.current?.selectedIndex !== 0
                        : advanceFilter1?.current?.selectedIndex !== 0
                )
            )
                ? [...advanceFilteredJobs] : !!filteredJobs.length ? [...filteredJobs] : [...originalJobs];

            let searchedJobs = jobsClone.filter(job => (advanceFilter1?.current?.selectedIndex !== 0 && advanceFilter2?.current?.selectedIndex !== 0)
                ? (job?.country?.toLowerCase() === advanceFilter1?.current?.value?.toLowerCase() && job?.experience?.toLowerCase() === advanceFilter2?.current?.value?.toLowerCase())
                : job[filterType === 1 ? "country" : "experience"]?.toLowerCase() === value.toLowerCase());

            setJobs(searchedJobs);
            setAdvanceFilteredJobs(searchedJobs);
        } else {
            if (advanceFilter1?.current?.selectedIndex === 0 && advanceFilter2?.current?.selectedIndex === 0) {
                setAdvanceFilteredJobs([]);
                setJobs(!!filteredJobs.length ? filteredJobs : originalJobs);
            } else {
                setJobs(!!advanceFilteredJobs.length ? advanceFilteredJobs : !!filteredJobs.length ? filteredJobs : originalJobs);
            }
        }
    }

    const handleFileChange = e => {
        if (e.target.files[0].size > 10485760) { // 10 MB in bytes
            swal('File is too big', {
                icon: "error"
            });
            e.target.value = "";
        };
    }

    const handleApply = async _ => {
        const confirm = await swal({
            title: "Confirmation of Application",
            text: "Are you sure?",
            icon: "info",
            buttons: true
        });
        if (confirm) {
            swal(`Thanks for applying for ${jobs?.find(job => job._id === jobActiveId)?.position} job on ${jobs?.find(job => job._id === jobActiveId)?.company}`, {
                icon: "success"
            });
            setModal(false);
            setJobActiveId("");
        }
    }

    return (
        <Fragment>
            <Header />
            <Container className="p-3">
                <Row className="align-items-center">
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search by keyword"
                                aria-label="Search by keyword"
                                aria-describedby="basic-addon2"
                                onInput={e => searchData(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            {["All", "Full Time", "Part Time", "Freelancer"].map((title, index) => {
                                return <Form.Check
                                    key={index}
                                    custom
                                    inline
                                    label={title}
                                    defaultChecked={!!index ? false : true}
                                    type="radio"
                                    name="filter"
                                    value={title}
                                    onChange={e => filterData(e.target.value)}
                                    id={index.toString()}
                                    style={{ zoom: 1.2 }}
                                />
                            })}
                        </div>
                    </Col>
                </Row>
                <h3 className="mt-2">Advance Search</h3>
                <hr />
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Filter by location</Form.Label>
                            <Form.Control ref={advanceFilter1} as="select" onChange={e => advanceFilterData(e.target.value, e.target.selectedIndex, 1)}>
                                {["Select Location", "America", "UK", "England", "Africa"].map((location, index) => {
                                    return <option key={index} value={location}>{location}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Filter by experience</Form.Label>
                            <Form.Control ref={advanceFilter2} as="select" onChange={e => advanceFilterData(e.target.value, e.target.selectedIndex, 2)}>
                                {["Select Experience", "1-2 years", "2-3 years", "3-4 years", "4-5 years", "5-6 years"].map((experience, index) => {
                                    return <option key={index} value={experience}>{experience}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                {!!jobs.length ? jobs.map(job => {
                    return <Card key={job._id} jobData={job} setModal={setModal} setJobActiveId={setJobActiveId} />
                }) : !loader ? <h3 className="text-center mt-5">No Data</h3> : <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>}
            </Container>
            <Footer />

            <Modal show={modal} size="lg" onHide={_ => { setModal(false); setJobActiveId("") }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Mobile</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Mobile"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm={2}>Upload Resume</Form.Label>
                            <Col sm={10}>
                                <Form.File accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={_ => { setModal(false); setJobActiveId("") }}>Cancel</Button>
                    <Button variant="primary" onClick={handleApply}>Apply</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Home;