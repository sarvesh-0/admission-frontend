// src/components/CustomNavbar.js (or Header.js if you renamed it)
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomNavbar.css'; // Import the CSS file

function CustomNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="glowing-text"> {/* Add the class here */}
                    Admission Portal
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link as={Link} to="/about" className="nav-link-glowing">About Us</Nav.Link>
                    <Nav.Link as={Link} to="/" className="nav-link-glowing">Admission Form</Nav.Link>
                    <Nav.Link as={Link} to="/report" className="nav-link-glowing">Report</Nav.Link>
                        {/* Add more navigation links as needed */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;