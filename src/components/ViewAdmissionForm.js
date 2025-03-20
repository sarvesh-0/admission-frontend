import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap'; // Import Button
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewAdmissionForm.css'; // Import a separate CSS file

function ViewAdmissionForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get(`https://admissionportal-050o.onrender.com/api/admissions/${id}`);
                setFormData(response.data);
            } catch (err) {
                setError('Failed to fetch form data');
                console.error("Error fetching form:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [id]);

    const handleGoBack = () => {
        navigate('/report'); // Go back to the report page
    };

    const handlePrint = () => {
        window.print(); // Trigger the browser's print dialog
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!formData) {
        return <div className="not-found">Form not found.</div>;
    }

    return (
        <Container className="invoice-container">
            <Row className="mb-4">
                <Col>
                    <h2 className="invoice-title">Admission Form Details</h2>
                    <p className="invoice-id">Admission ID: {id}</p>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary" onClick={handleGoBack} className="me-2">
                        Go Back
                    </Button>
                    <Button variant="primary" onClick={handlePrint}>
                        Print
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={4} className="invoice-section d-flex flex-column align-items-center text-center">
                    <h4>Marksheet</h4>
                    {formData.marksheet && (
                        <Image src={`https://admissionportal-050o.onrender.com/${formData.marksheet}`} alt="Marksheet" fluid thumbnail style={{ maxWidth: '200px' }} />
                    )}
                </Col>
                <Col md={4} className="invoice-section d-flex flex-column align-items-center text-center">
                    <h4>Photo</h4>
                    {formData.photo && (
                        <Image src={`https://admissionportal-050o.onrender.com/${formData.photo}`} alt="Photo" fluid thumbnail style={{ maxWidth: '200px' }} />
                    )}
                </Col>
                <Col md={4} className="invoice-section d-flex flex-column align-items-center text-center">
                    <h4>Signature</h4>
                    {formData.signature && (
                        <Image src={`https://admissionportal-050o.onrender.com/${formData.signature}`} alt="Signature" fluid thumbnail style={{ maxWidth: '200px' }} />
                    )}
                </Col>
            </Row>
            <Row>
                <Col md={6} className="invoice-section">
                    <h4>Personal Information</h4>
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>First Name:</strong> {formData.firstName}</p>
                    <p><strong>Middle Name:</strong> {formData.middleName}</p>
                    <p><strong>Last Name:</strong> {formData.lastName}</p>
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Mother's Name:</strong> {formData.motherName}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>

                </Col>
                <Col md={6} className="invoice-section">
                    <h4>Contact Information</h4>
                    <p><strong>Address:</strong> {formData.address}</p>
                    <p><strong>Taluka:</strong> {formData.taluka}</p>
                    <p><strong>District:</strong> {formData.district}</p>
                    <p><strong>Pin Code:</strong> {formData.pinCode}</p>
                    <p><strong>State:</strong> {formData.state}</p>
                    <p><strong>Mobile:</strong> {formData.mobile}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Aadhaar:</strong> {formData.aadhaar}</p>

                </Col>
            </Row>
            <Row>
                <Col md={6} className="invoice-section">
                    <h4>Other Details</h4>
                    <p><strong>Date of Birth:</strong> {formData.dob}</p>
                    <p><strong>Age:</strong> {formData.age}</p>
                    <p><strong>Religion:</strong> {formData.religion}</p>
                    <p><strong>Caste Category:</strong> {formData.casteCategory}</p>
                    <p><strong>Caste:</strong> {formData.caste}</p>
                    <p><strong>Physically Handicapped:</strong> {formData.physicallyHandicapped}</p>
                </Col>
            </Row>



        </Container>
    );
}

export default ViewAdmissionForm;