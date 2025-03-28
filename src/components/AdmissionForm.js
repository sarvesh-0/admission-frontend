import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function AdmissionForm() {
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        motherName: '',
        gender: '',
        address: '',
        taluka: '',
        district: '',
        pinCode: '',
        state: '',
        mobile: '',
        email: '',
        aadhaar: '',
        dob: '',
        religion: '',
        casteCategory: '',
        caste: '',
        physicallyHandicapped: 'No',
        marksheet: null,
        photo: null,
        signature: null,
    });

    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Loading indicator

    const districtTalukaData = {
        "Ahmednagar": ["Akole", "Jamkhed", "Karjat", "Kopargaon", "Nagar", "Nevasa", "Parner", "Pathardi", "Rahata", "Rahuri", "Sangamner", "Shevgaon", "Shrigonda", "Shrirampur"],
        "Akola": ["Akola", "Akot", "Balapur", "Murtizapur", "Telhara"],
        "Amravati": ["Achalpur", "Amravati", "Anjangaon Surji", "Chandur Railway", "Chandurbazar", "Daryapur", "Dhamangaon Railway", "Morshi", "Nandgaon-Khandeshwar", "Teosa", "Warud"],
        "Aurangabad": ["Aurangabad", "Kannad", "Khuldabad", "Paithan", "Phulambri", "Sillod", "Soegaon", "Vaijapur", "Gangapur"],
        "Beed": ["Ambejogai", "Ashti", "Beed", "Georai", "Kaij", "Majalgaon", "Parli", "Patoda", "Shirur", "Wadwani"],
        "Bhandara": ["Bhandara", "Lakhandur", "Mohadi", "Pauni", "Sakoli", "Tumsar"],
        "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Jalgaon Jamod", "Khamgaon", "Lonar", "Mehkar", "Malkapur", "Motala", "Nandura", "Shegaon", "Sindkhed Raja"],
        "Chandrapur": ["Ballarpur", "Bhadravati", "Brahmapuri", "Chandrapur", "Gondpipri", "Jiwati", "Korpana", "Mul", "Nagbhid", "Pombhurna", "Rajura", "Sawali", "Sindewahi", "Warora"],
        "Dhule": ["Dhule", "Sakri", "Shindkheda", "Shirpur"],
        "Gadchiroli": ["Aheri", "Armori", "Bhamragad", "Chamorshi", "Dhanora", "Desaiganj", "Etapalli", "Gadchiroli", "Kurkheda", "Mulchera", "Sironcha"],
        "Gondia": ["Amgaon", "Arjuni Morgaon", "Deori", "Gondia", "Goregaon", "Sadak Arjuni", "Salekasa", "Tirora"],
        "Hingoli": ["Aundha", "Basmath", "Hingoli", "Kalamnuri", "Sengaon"],
        "Jalgaon": ["Amalner", "Bhadgaon", "Bhusawal", "Bodwad", "Chalisgaon", "Chopda", "Dharangaon", "Erandol", "Jalgaon", "Jamner", "Muktainagar", "Pachora", "Parola", "Raver", "Yawal"],
        "Jalna": ["Ambad", "Badnapur", "Bhokardan", "Ghansawangi", "Jafferabad", "Jalna", "Mantha", "Partur"],
        "Kolhapur": ["Ajara", "Bavda", "Chandgad", "Gadhinglaj", "Hatkanangale", "Kagal", "Karveer", "Panhala", "Radhanagari", "Shahuwadi"],
        "Latur": ["Ahmadpur", "Ausa", "Chakur", "Deoni", "Jalkot", "Latur", "Nilanga", "Renapur", "Shirur Anantpal", "Udgir"],
        "Mumbai City": ["Colaba", "Byculla", "Dadar", "Kurla", "Andheri"],
        "Mumbai Suburban": ["Bandra", "Borivali", "Dahisar", "Goregaon", "Jogeshwari", "Kandivali", "Malad", "Mulund"],
        "Nagpur": ["Hingna", "Kalameshwar", "Kamthi", "Kuhi", "Nagpur (Urban)", "Nagpur (Rural)", "Narkhed", "Parseoni", "Ramtek", "Savner", "Umred"],
        "Nanded": ["Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Himayatnagar", "Kandhar", "Kinwat", "Loha", "Mahoor", "Mudkhed", "Mukhed", "Nanded", "Naigaon"],
        "Nandurbar": ["Akkalkuwa", "Akrani", "Nandurbar", "Navapur", "Shahada", "Taloda"],
        "Nashik": ["Baglan", "Chandvad", "Deola", "Dindori", "Igatpuri", "Kalwan", "Malegaon", "Manmad", "Nandgaon", "Nashik", "Peint", "Sinnar", "Surgana", "Trimbakeshwar", "Yeola"],
        "Osmanabad": ["Bhum", "Kalamb", "Lohara", "Osmanabad", "Paranda", "Tuljapur", "Umarga", "Washi"],
        "Palghar": ["Dahanu", "Jawhar", "Mokhada", "Palghar", "Talasari", "Vasai", "Vikramgad", "Wada"],
        "Parbhani": ["Gangakhed", "Jintur", "Manwat", "Palam", "Parbhani", "Pathri", "Purna", "Sailu", "Sonpeth"],
        "Pune": ["Ambegaon", "Baramati", "Bhor", "Daund", "Haveli", "Indapur", "Junnar", "Khed", "Mawal", "Mulshi", "Pune City", "Shirur", "Velhe"],
        "Raigad": ["Alibag", "Karjat", "Khalapur", "Mahad", "Mangaon", "Murud", "Panvel", "Pen", "Poladpur", "Roha", "Shrivardhan", "Sudhagad"],
        "Ratnagiri": ["Chiplun", "Dapoli", "Guhagar", "Khed", "Lanja", "Mandangad", "Rajapur", "Ratnagiri", "Sangameshwar"],
        "Sangli": ["Atpadi", "Jat", "Kadegaon", "Kavathe Mahankal", "Miraj", "Palus", "Shirala", "Tasgaon", "Walwa"],
        "Satara": ["Jaoli", "Khandala", "Khatav", "Koregaon", "Mahabaleshwar", "Man", "Patan", "Phaltan", "Satara", "Wai"],
        "Sindhudurg": ["Devgad", "Kankavli", "Kudal", "Malvan", "Sawantwadi", "Vengurla"],
        "Solapur": ["Akkalkot", "Barshi", "Karmala", "Madha", "Malshiras", "Mangalvedhe", "Mohol", "Pandharpur", "Sangola", "Solapur North", "Solapur South"],
        "Thane": ["Ambarnath", "Bhiwandi", "Kalyan", "Murbad", "Shahapur", "Thane", "Ulhasnagar"],
        "Wardha": ["Arvi", "Ashti", "Deoli", "Hinganghat", "Karanja", "Samudrapur", "Seloo", "Wardha"],
        "Washim": ["Karanja", "Malegaon", "Mangrulpir", "Manora", "Risod", "Washim"],
        "Yavatmal": ["Arni", "Babulgaon", "Darwha", "Digras", "Ghatanji", "Kalamb", "Mahagaon", "Maregaon", "Ner", "Pandharkawada", "Pusad", "Ralegaon", "Umarkhed", "Wani", "Yavatmal"]
    };


    useEffect(() => {
        setDistricts(Object.keys(districtTalukaData));
    }, []);

    useEffect(() => {
        if (formData.district) {
            setTalukas(districtTalukaData[formData.district] || []);
        } else {
            setTalukas([]);
        }
    }, [formData.district]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Initialize updatedGender with the current gender
        let updatedGender = formData.gender;

        if (name === 'title') {
            // Title -> Gender logic
            if (value === 'Mr.') {
                updatedGender = 'Male';
            } else if (value === 'Mrs.') {
                updatedGender = 'Female';
            } else if (value === 'Mrx.') {
                updatedGender = 'Other';
            }
            // Set the updated gender
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
                gender: updatedGender
            }));

        } else {
             setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        setErrors({ ...errors, [name]: '' }); // Clear error on change
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
        setErrors({ ...errors, [name]: '' }); // Clear error
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({}); // Clear previous errors
        setSuccessMessage('');

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('https://admissionportal-050o.onrender.com/api/admissions/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Form submitted successfully!');
            console.log(response.data); // Log the response
            // Reset the form (optional)
            setFormData({
                title: '',
                firstName: '',
                middleName: '',
                lastName: '',
                motherName: '',
                gender: '',
                address: '',
                taluka: '',
                district: '',
                pinCode: '',
                state: '',
                mobile: '',
                email: '',
                aadhaar: '',
                dob: '',
                religion: '',
                casteCategory: '',
                caste: '',
                physicallyHandicapped: 'No',
                marksheet: null,
                photo: null,
                signature: null,
            });


        } catch (error) {
            if (error.response && error.response.data) {
                // Set backend validation errors
                setErrors(error.response.data);
            } else {
                // Handle other errors (network, etc.)
                console.error("Error submitting form:", error);
                setErrors({ general: 'An unexpected error occurred.' }); // General error message
            }
        } finally {
            setIsLoading(false); // Stop loading, regardless of success/failure
        }
    };

    return (
        <Container className="form-container">
            <h2>Admission Form</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Select name="title" value={formData.title} onChange={handleChange} isInvalid={!!errors.title} required>
                                <option value="">Select Title</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Mrx.">Mrx.</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} isInvalid={!!errors.firstName} required />
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group >
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={formData.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Mother's Name</Form.Label>
                            <Form.Control type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" value={formData.gender} onChange={handleChange} isInvalid={!!errors.gender} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>

                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>District</Form.Label>
                            <Form.Select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}

                            >
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Taluka</Form.Label>
                            <Form.Select
                                name="taluka"
                                value={formData.taluka}
                                onChange={handleChange}

                            >
                                <option value="">Select Taluka</option>
                                {talukas.map((taluka) => (
                                    <option key={taluka} value={taluka}>
                                        {taluka}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} isInvalid={!!errors.pinCode} required pattern="^\d{6}$" title="Pin code must be a 6-digit number." />
                            <Form.Control.Feedback type="invalid">{errors.pinCode}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} isInvalid={!!errors.mobile} required pattern="[6-9]\d{9}" title="Invalid mobile number" />
                            <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} required />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Aadhaar Number</Form.Label>
                            <Form.Control type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} isInvalid={!!errors.aadhaar} required pattern="\d{12}" title="Aadhaar Number must be a 12-digit number." />
                            <Form.Control.Feedback type="invalid">{errors.aadhaar}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} isInvalid={!!errors.dob} required />
                            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Religion</Form.Label>
                            <Form.Select name="religion" value={formData.religion} onChange={handleChange}>
                                <option value="">Select Religion</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Muslim">Muslim</option>
                                <option value="Christian">Christian</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Caste Category</Form.Label>
                            <Form.Control type="text" name="casteCategory" value={formData.casteCategory} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Caste</Form.Label>
                            <Form.Control type="text" name="caste" value={formData.caste} onChange={handleChange} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col md={4} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Marksheet (Max: 1MB)</Form.Label>
                            <Form.Control type="file" name="marksheet" onChange={handleFileChange} isInvalid={!!errors.marksheet} accept=".jpeg,.jpg,.png" required />
                            <Form.Control.Feedback type="invalid">{errors.marksheet}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Photo (Max: 1MB)</Form.Label>
                            <Form.Control type="file" name="photo" onChange={handleFileChange} isInvalid={!!errors.photo} accept=".jpeg,.jpg,.png" required />
                            <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4} xs={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Signature (Max: 1MB)</Form.Label>
                            <Form.Control type="file" name="signature" onChange={handleFileChange} isInvalid={!!errors.signature} accept=".jpeg,.jpg,.png" required />
                            <Form.Control.Feedback type="invalid">{errors.signature}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Physically Handicapped</Form.Label><br />
                    <Form.Check inline type="radio" name="physicallyHandicapped" label="Yes" value="Yes" checked={formData.physicallyHandicapped === 'Yes'} onChange={handleChange} />
                    <Form.Check inline type="radio" name="physicallyHandicapped" label="No" value="No" checked={formData.physicallyHandicapped === 'No'} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </Container>
    );
}

export default AdmissionForm;