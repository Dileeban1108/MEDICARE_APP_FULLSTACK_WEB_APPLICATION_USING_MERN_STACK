import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/diseasePopup.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const DiseasePopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
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
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getDisease"
        );
        setDiseases(response.data);
        setFilteredDiseases(response.data);
      } catch (error) {
        console.error("Failed to fetch diseases", error);
      }
    };

    fetchDiseases();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = diseases.filter(
      (disease) =>
        (disease.symtems && disease.symtems.toLowerCase().includes(term)) ||
        (disease.diseasename &&
          disease.diseasename.toLowerCase().includes(term))
    );
    setFilteredDiseases(filtered);
  };
  const handleDelete = async (diseasename) => {
    try {
      await axios.delete(
        `http://localhost:3001/auth/deleteDisease/${diseasename}`
      );
      setFilteredDiseases(
        filteredDiseases.filter(
          (disease) => disease.diseasename !== diseasename
        )
      );
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="popup-overlay_3">
      <div className="popup-content_3">
        <div className="button-container_2">
          <h2>Identify Your Disease</h2>
          <button className="close-button_3" onClick={onClose}>
            X
          </button>
        </div>
        <div className="disease-contents">
          <div className="search-box_2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter symptoms or disease name..."
            />
          </div>
          <div className="diseases-list">
            {filteredDiseases.length > 0 ? (
              filteredDiseases.map((disease, index) => (
                <div key={index} className="disease-box">
                  <div>
                    <h3>{disease.diseasename}</h3>
                    <p><h4>Symptoms:</h4> {disease.symtems}</p>
                    
                    <p> {disease.description}</p>
                    </div>

                    <p><h4>Treatment: </h4>{disease.treatment}</p>
                  {userRole === "doctor" && (
                    <button
                    style={{height:"40px"
                    }}
                      className="delete-button"
                      onClick={() => handleDelete(disease.diseasename)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>Try with booking a doctor</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePopup;
