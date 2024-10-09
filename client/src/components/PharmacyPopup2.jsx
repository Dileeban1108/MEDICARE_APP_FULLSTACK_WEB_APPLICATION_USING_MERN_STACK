import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pharmacyPopup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PharmacyPopup = ({ onClose, onAddMedicine }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch user role to check if the user is a doctor
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

  // Fetch medicines from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getMedicines"
        );
        setMedicines(response.data);
        setFilteredMedicines(response.data);
      } catch (error) {
        console.error("Failed to fetch medicines", error);
      }
    };
    fetchMedicines();
  }, []);

  // Filter medicines based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = medicines.filter((medicine) =>
      medicine.medicinename.toLowerCase().includes(term)
    );
    setFilteredMedicines(filtered);
  };

  // Handle adding medicine to cart
  const handleBuy = (medicineId) => {
    const selectedMedicine = medicines.find((med) => med._id === medicineId);
    if (selectedMedicine) {
      onAddMedicine({
        medicinename: selectedMedicine.medicinename,
        quantity: 1,
        unit: "pills",
      });
      navigate('/buymedicine')
      onClose(); // Close the popup after buying medicine
    } else {
      toast.error("Failed to add medicine to cart");
    }
  };

  // Handle deleting medicine
  const handleDelete = async (medicinename) => {
    try {
      await axios.delete(
        `http://localhost:3001/auth/deleteMedicine/${medicinename}`
      );
      setFilteredMedicines(
        filteredMedicines.filter(
          (medicine) => medicine.medicinename !== medicinename
        )
      );
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="popup-overlay_4">
      <div className="popup-content_4">
        <div className="button-container_3">
          <h2>Find and Buy Medicines</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <div className="pharmacy-contents">
          <div className="search-box_3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter medicine name here..."
            />
          </div>
          <div className="medicine-list">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine, index) => (
                <div key={index} className="medicine-box">
                  <h3>{medicine.medicinename}</h3>
                  <p>Available Quantity: {medicine.quantity}</p>
                  <button onClick={() => handleBuy(medicine._id)}>Buy</button>
                  {userRole === "doctor" && (
                    <button
                      style={{ height: "40px" }}
                      className="delete-button"
                      onClick={() => handleDelete(medicine.medicinename)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No medicines found. Try a different search term.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPopup;
