import './App.css';
import React from 'react';
import AdmissionForm from './components/AdmissionForm';
import Report from './components/Report';
import EditAdmissionForm from './components/EditAdmissionForm'; // Import
import ViewAdmissionForm from './components/ViewAdmissionForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import AboutUs from './components/AboutUs';
function App() {
  return (
    <Router>
    <div className="app-container">
      <Navbar />
        <main className="main-content">
            <Routes>
                <Route path="/admission-frontend" element={<AboutUs/>}/>
                <Route path="/admissionform" element={<AdmissionForm />} />
                <Route path="/report" element={<Report />} />
                <Route path="/view/:id" element={<ViewAdmissionForm />} />
                <Route path="/edit/:id" element={<EditAdmissionForm />} /> {/* Add route for editing */}
            </Routes>
        </main>
        <Footer />
    </div>
</Router>
        
  );
}

export default App;
