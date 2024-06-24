// routes/purchaseRoutes.js
const express = require('express');
const purchaseController=require("../controllers/purchaseController")
const router = express.Router();

// Purchase Medicines Route
router.post('/purchaseMedicines',purchaseController.makePurchase);

module.exports = router ;
