import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/hospitalPopup.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const HospitalPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const decoded = jwtDecode(accessToken); // Use jwtDecode correctly
        const email = decoded?.userInfo?.email;
        if (email) {
          const response = await axios.get(
            `http://localhost:3001/auth/getDoctor/${email}`, // Use email in the URL
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          }
          );
          setUserRole("doctor");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };
    fetchDoctorDetails();
  }, []);
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getHospitals");
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (error) {
        console.error("Failed to fetch hospital", error);
      }
    };
    fetchHospitals();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = hospitals.filter(
      (hospital) =>
        hospital.hospitalname.toLowerCase().includes(term) ||
        hospital.address.toLowerCase().includes(term)
    );
    setFilteredHospitals(filtered);
  };
  const handleDelete = async (hospitalname) => {
    try {
      await axios.delete(`http://localhost:3001/auth/deleteHospital/${hospitalname}`);
      setFilteredHospitals(filteredHospitals.filter(hospital => hospital.hospitalname !== hospitalname));
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };
  
  return (
    <div className="popup-overlay_4">
      <div className="popup-content_4">
        <div className="button-container_3">
          <h2>Find Nearest Hospital</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <div className="hospitai-contents">
          <div className="search-box_3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter hospital name or location..."
            />
          </div>
          <div className="hospital-list">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital, index) => (
                <div key={index} className="hospital-box_3">
                  <h3>{hospital.hospitalname}</h3>
                  <p>Address: {hospital.address}</p>
                  {userRole === "doctor" && (
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(hospital.hospitalname)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No hospitals found. Try booking a doctor instead.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPopup;
