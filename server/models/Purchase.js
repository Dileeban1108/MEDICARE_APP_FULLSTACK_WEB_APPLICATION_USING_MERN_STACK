const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: String, required: true },
  medicines: { type: String, required: true }, // Store as a string if JSON object
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
