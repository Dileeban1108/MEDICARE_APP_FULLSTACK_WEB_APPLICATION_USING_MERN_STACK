const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: String, required: true }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
