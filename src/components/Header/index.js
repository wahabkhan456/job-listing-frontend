import React from "react";
import logo from "../../assets/logo.jpg";
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="p-2">
            <Link to="/" className="text-dark text-decoration-none">
                <img src={logo} alt="logo" style={{ width: 200, height: 80 }} />
            </Link>
            <Nav className="ml-auto">
                <Button variant="light" className="mx-2" onClick={() => null}>Login</Button>
                <Button variant="flat" onClick={() => null}>
                    Join Now
                </Button>
            </Nav>
        </Navbar>
    )
}

export default Header