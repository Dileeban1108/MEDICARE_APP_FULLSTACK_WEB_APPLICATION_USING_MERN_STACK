import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pharmacyPopup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PharmacyPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

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
    fetchDoctorDetails();
  }, []);

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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = medicines.filter((medicine) =>
      medicine.medicinename.toLowerCase().includes(term)
    );
    setFilteredMedicines(filtered);
  };

  const handleBuy = (medicineId) => {
    const selectedMedicine = medicines.find((med) => med.id === medicineId);
    if (selectedMedicine) {
      // Add the selected medicine to BuyMedicine page
      navigate(`/buymedicine?medicinename=${selectedMedicine.medicinename}&quantity=1`);
    } else {
      toast.error("Failed to add medicine to cart");
    }
  };

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
                  <p>Quantity: {medicine.quantity}</p>
                  <button onClick={() => handleBuy(medicine.id)}>Buy</button>
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
