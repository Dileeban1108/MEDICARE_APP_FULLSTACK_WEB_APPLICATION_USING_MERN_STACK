import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/popupModel.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMedicines = ({ onClose }) => {
  const [medicinename, setMedicinename] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/createMedicine",
        {
            medicinename,
            quantity
        }
      );
      if (response && response.data.success) {
        setTimeout(() => {
          toast.success("Successfully added");
          navigate("/");
          window.location.reload();
        });
      } else {
        toast.error("failed to add Medicine. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the Medicine.");
    }
  };

  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />
      <div className="modal-content">
        <div className="button-container">
          <h2>Add a Medicine</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={medicinename}
              onChange={(e) => setMedicinename(e.target.value)}
              required
              placeholder="Medicine Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              placeholder="Quantity"
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicines;
