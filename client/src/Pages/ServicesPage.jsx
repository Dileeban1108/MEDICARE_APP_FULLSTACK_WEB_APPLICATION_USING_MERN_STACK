import React, { useState, useEffect } from "react";
import "../styles/services.css";
import { useNavigate } from "react-router-dom";
import DiseasePopup from "../components/DiseasePopup";
import HospitalPopup from "../components/HospitalPopup";
import HealthTipsPopup from "../components/HealthTipsPopup";
import PharmacyPopup from "../components/PharmacyPopup";
import axios from "axios";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [showDiseasePopup, setShowDiseasePopup] = useState(false);
  const [showHospitalPopup, setShowHospitalPopup] = useState(false);
  const [showHealthTipsPopup, setShowHealthTipsPopup] = useState(false);
  const [showPharmacyPopup, setShowPharmacyPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {

    const fetchDoctorDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          const response = await axios.get(`http://localhost:3001/auth/getDoctor/${email}`);
          setUserRole("doctor");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };
    fetchDoctorDetails();
  }, []);
  const handleBookDoctorClick = () => {
    navigate("/bookdoctor");
  };

  const handleIdentifyDiseaseClick = () => {
    setShowDiseasePopup(true);
  };

  const handleIdentifyHospitalClick = () => {
    setShowHospitalPopup(true);
  };

  const handleHealthTipsClick = () => {
    setShowHealthTipsPopup(true);
  };
  const handlePharmacyClick = () => {
    setShowPharmacyPopup(true);
  };

  const handleCloseDiseasePopup = () => {
    setShowDiseasePopup(false);
  };

  const handleCloseHospitalPopup = () => {
    setShowHospitalPopup(false);
  };

  const handleCloseHealthTipsPopup = () => {
    setShowHealthTipsPopup(false);
  };
  const handleClosePharmacyPopup = () => {
    setShowPharmacyPopup(false);
  };

  return (
    <section className="services">
      <div className="text">
        <h1>Services</h1>
      </div>
      <div className="services-container">
        {userRole !== "doctor" && (
          <div className="service-box box1" onClick={handleBookDoctorClick}>
            <h2>Book a Doctor Now</h2>
            <p>Find and schedule appointments with doctors online.</p>
          </div>
        )}
        <div className="service-box box2" onClick={handleIdentifyDiseaseClick}>
          <h2>Identify Your Disease</h2>
          <p>
            Learn about symptoms and conditions to help identify your disease.
          </p>
        </div>
        <div className="service-box box3" onClick={handleIdentifyHospitalClick}>
          <h2>Find the Nearest Hospital</h2>
          <p>
            Locate hospitals near your area for immediate medical attention.
          </p>
        </div>
        <div className="service-box box4" onClick={handleHealthTipsClick}>
          <h2>Health Tips</h2>
          <p>
            Get valuable tips and advice for maintaining a healthy lifestyle.
          </p>
        </div>
        <div className="service-box box5" onClick={handlePharmacyClick}>
          <h2>Pharmacy</h2>
          <p>Get all the medicines you want.</p>
          <h3 style={{color:"red",background:"white"}}>Please use the pharmacy with a recomendation of a doctor.</h3>
        </div>
      </div>
      {showDiseasePopup && <DiseasePopup onClose={handleCloseDiseasePopup} />}
      {showHospitalPopup && (
        <HospitalPopup onClose={handleCloseHospitalPopup} />
      )}
      {showHealthTipsPopup && (
        <HealthTipsPopup onClose={handleCloseHealthTipsPopup} />
      )}
      {showPharmacyPopup && (
        <PharmacyPopup onClose={handleClosePharmacyPopup} />
      )}
    </section>
  );
};

export default ServicesPage;
