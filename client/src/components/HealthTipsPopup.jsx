import "../styles/healthTipsPopup.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const HealthTipsPopup = ({ onClose }) => {
  const [healthtips, setHealthtips] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          const response = await axios.get(
            `http://localhost:3001/auth/getDoctor/${email}`
          );
          setUserRole("doctor");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    const fetchHealthTips = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getHealthTips"
        );
        setHealthtips(response.data);
      } catch (error) {
        console.error("Failed to fetch health tips", error);
      }
    };

    fetchDoctorDetails();
    fetchHealthTips();
  }, []);

  const handleDelete = async (healthtipname) => {
    try {
      await axios.delete(
        `http://localhost:3001/auth/deleteHealthTip/${healthtipname}`
      );
      setHealthtips((prevTips) =>
        prevTips.filter((tip) => tip.healthtipname !== healthtipname)
      );
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content_5">
        <div className="button-container_4">
          <h2>Health Tips</h2>
          <button className="close-button_5" onClick={onClose}>
            X
          </button>
        </div>
        <div className="health-tips-list">
          {healthtips.map((healthtip, index) => (
            <div key={index} className="health-tip-box">
              <div>
                <h4>{healthtip.healthtipname}</h4>
                <p>{healthtip.description}</p>
              </div>
              <p>Added by Dr.{healthtip.username}</p>
              {userRole === "doctor" && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(healthtip.healthtipname)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HealthTipsPopup;
