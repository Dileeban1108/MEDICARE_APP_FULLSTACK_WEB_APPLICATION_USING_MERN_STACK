const Purchase = require("../models/Purchase");

const makePurchase = async (req, res) => {
  const { cardNumber, expiryDate, cvv, amount, medicines } = req.body;

  try {
    if (!cardNumber || !expiryDate || !cvv || !amount || !medicines) {
      return res.status(400).json({ message: "Invalid card details" });
    }

    console.log("Received purchase data:", req.body);

    const newPurchase = await Purchase.create({
      cardNumber,
      expiryDate,
      cvv,
      amount,
      medicines: JSON.stringify(medicines), // Ensure medicines are stored correctly
    });

    res.status(200).json({ message: "Purchase successful" });
  } catch (error) {
    console.error("Failed to complete purchase", error);
    res.status(500).json({ message: "Failed to complete purchase" });
  }
};

module.exports = { makePurchase };
