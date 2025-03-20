import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AboutUs.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';


function AboutUs() {
    return (
        <div className="about-us-container">
            {/* Hero Section */}
            <div className="hero">
                <h1>About Us</h1>
                <p>
                    Empowering students and institutions with a seamless, efficient, and user-friendly admission experience.
                </p>
            </div>

            {/* Main Content */}
            <main>
                <section>
                    <h2>Welcome to Our Admission Portal</h2>
                    <p>
                        Our Admission Portal simplifies and streamlines the application process for students and institutions.
                        We aim to create an efficient, user-friendly platform that handles everything from registration to
                        document submission and admission tracking.
                    </p>
                    <p>
                        With advanced features like real-time application status, secure data handling, and comprehensive reporting,
                        we empower institutions to manage admissions effectively and help students focus on achieving their dreams.
                    </p>
                </section>
                <section>
                    <h2>Our Mission</h2>
                    <p>
                        To provide a seamless and transparent admission experience by leveraging technology to bridge the gap between
                        institutions and aspiring students.
                    </p>
                </section>
                <section>
                    <h2>Our Vision</h2>
                    <p>
                        To revolutionize the admission process globally, making education more accessible and equitable for everyone.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default AboutUs;