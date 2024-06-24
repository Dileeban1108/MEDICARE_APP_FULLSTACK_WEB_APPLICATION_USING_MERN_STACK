const Purchase = require("../models/Purchase");

const makePurchase = async (req, res) => {
  const { cardNumber, expiryDate, cvv, amount } = req.body;

  try {
    if (!cardNumber || !expiryDate || !cvv || !amount) {
      return res.status(400).json({ message: "Invalid card details" });
    }

    const newPurchase = await Purchase.create({
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      amount: amount,
    });

    res.status(200).json({ message: "Purchase successful" });
  } catch (error) {
    console.error("Failed to complete purchase", error);
    res.status(500).json({ message: "Failed to complete purchase" });
  }
};
module.exports = { makePurchase };
