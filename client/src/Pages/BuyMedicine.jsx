import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/buyMedicine.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cardImage from "../assets/card.png";
import PharmacyPopup2 from "../components/PharmacyPopup2";

const BuyMedicine = () => {
  const navigate = useNavigate();
  const [showPharmacyPopup, setShowPharmacyPopup] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddMedicine = (medicine) => {
    setMedicines((prevMedicines) => [...prevMedicines, medicine]);
    setShowPharmacyPopup(false); // Close popup after adding medicine
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = medicines.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setMedicines(newMedicines);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, "");

    if (input.length > 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }

    setExpiryDate(input);
  };

  const encryptCVV = (cvv) => {
    return cvv.split("").map(() => "*").join("");
  };

  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(date)) return false;
    
    const [month, year] = date.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    return true;
  };

  const validateCVV = (cvv) => {
    const regex = /^\d{3,4}$/;
    return regex.test(cvv);
  };

  const handlePurchase = async () => {
    if (!validateCardNumber(cardNumber)) {
      toast.error("Invalid card number. Please enter a 16-digit card number.");
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      toast.error("Invalid expiry date. Please enter a valid MM/YY format and ensure it's a future date.");
      return;
    }

    if (!validateCVV(cvv)) {
      toast.error("Invalid CVV. Please enter a 3 or 4-digit CVV.");
      return;
    }

    try {
      const encryptedCVV = encryptCVV(cvv);

      const purchaseData = {
        cardNumber,
        expiryDate,
        cvv: encryptedCVV,
        amount,
        medicines,
      };

      console.log("Sending purchase data:", purchaseData);

      await axios.post(
        "http://localhost:3001/purchaseRoutes/purchaseMedicines",
        purchaseData
      );
      toast.success(
        "Purchase successful! You will get medicines within today."
      );
    } catch (error) {
      console.error("Failed to complete purchase", error);
      toast.error("Failed to complete purchase");
    }
  };

  const handleRemoveMedicine = (index) => {
    setMedicines((prevMedicines) =>
      prevMedicines.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="buy-medicine-container">
      <div className="content-container">
        <div className="medicine-details">
          <h3>Medicine Details</h3>
          <ul className="medicine-list">
            {medicines.map((med, index) => (
              <li key={index}>
                <input
                  className="input_text"
                  style={{ width: "96%" }}
                  type="text"
                  value={med.medicinename}
                  readOnly
                />
                <div className="pillsgrams">
                  <input
                    className="input_number"
                    type="number"
                    value={med.quantity}
                    onChange={(e) =>
                      handleMedicineChange(index, "quantity", e.target.value)
                    }
                  />
                  <select
                    style={{ height: "38px", width: "20%" }}
                    value={med.unit}
                    onChange={(e) =>
                      handleMedicineChange(index, "unit", e.target.value)
                    }
                  >
                    <option value="pills">Pills</option>
                    <option value="grams">Grams</option>
                  </select>
                  <button
                    className="cancel-button"
                    onClick={() => handleRemoveMedicine(index)}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowPharmacyPopup(true)}>
            Add Medicine
          </button>
        </div>
        <div className="card-details">
          <img src={cardImage} alt="Card" className="card-image" />
          <div className="form-group">
            <input
              placeholder="Card Number"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Expiry Date (MMYY)"
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength="5"
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="CVV"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Amount (Rs)"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <button onClick={handlePurchase}>Purchase</button>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
      {showPharmacyPopup && (
        <PharmacyPopup2
          onClose={() => setShowPharmacyPopup(false)}
          onAddMedicine={handleAddMedicine}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default BuyMedicine;
