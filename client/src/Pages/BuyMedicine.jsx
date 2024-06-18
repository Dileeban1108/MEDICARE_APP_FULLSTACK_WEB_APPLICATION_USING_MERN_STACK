// BuyMedicine.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/buyMedicine.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cardImage from "../assets/card.png";
import PharmacyPopup from "../components/PharmacyPopup";

const BuyMedicine = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPharmacyPopup, setShowPharmacyPopup] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialMedicine = {
      medicinename: queryParams.get("medicinename"),
      quantity: parseInt(queryParams.get("quantity")) || 1,
      unit: queryParams.get("unit") || "pills",
    };
    if (initialMedicine.medicinename) {
      setMedicines([initialMedicine]);
    }
  }, [location.search]);

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
    // Remove non-numeric characters
    input = input.replace(/\D/g, '');
    
    // Add a slash after the first two characters if more than two characters are entered
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    
    setExpiryDate(input);
  };

  const encryptCVV = (cvv) => {
    // Example: Encrypt CVV (this should be replaced with your actual encryption logic)
    return cvv.split('').map(() => '*').join('');
  };

  const handlePurchase = async () => {
    try {
      const encryptedCVV = encryptCVV(cvv);

      await axios.post("http://localhost:3001/purchaseRoutes/purchaseMedicines", {
        cardNumber,
        expiryDate,
        cvv: encryptedCVV,
        amount,
        medicines,
      });
      toast.success("Purchase successful! You will get medicines within today.");
    } catch (error) {
      console.error("Failed to complete purchase", error);
      toast.error("Failed to complete purchase");
    }
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
                    onChange={(e) => handleMedicineChange(index, "quantity", e.target.value)}
                  />
                  <select
                    style={{ height: "38px", width: "20%" }}
                    value={med.unit}
                    onChange={(e) => handleMedicineChange(index, "unit", e.target.value)}
                  >
                    <option value="pills">Pills</option>
                    <option value="grams">Grams</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowPharmacyPopup(true)}>Add Medicine</button>
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
              maxLength="5" // Limit to 5 characters (MMYY)
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
        <PharmacyPopup onClose={() => setShowPharmacyPopup(false)} onAddMedicine={handleAddMedicine} />
      )}
      <ToastContainer />
    </div>
  );
};

export default BuyMedicine;
