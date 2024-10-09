const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require('../middlewares/verifyToken');

router.post("/login", authController.handleLogin);
router.post("/createHospital", authController.handleNewHospital);
router.post("/createReview", authController.createReview);
router.post("/createDisease", authController.handleNewDisease);
router.post("/createMedicine", authController.handleNewMedicine);
router.post("/createHealthTip", authController.handleNewHealthTip);
router.post("/bookDoctor", authController.bookDoctor);
router.get("/getDoctor/:email",verifyToken, authController.getDoctorByEmail);
router.get("/getDoctors/:specialization", authController.getDoctorByRole);
router.get("/getDisease", authController.getDisease);
router.get("/getHealthTips", authController.getHealthTips);
router.get("/getMedicines", authController.getMedicines);
router.get("/getHospitals", authController.getHospitals);
router.get("/getReviews", authController.getReviews);
router.get("/getPatients", authController.getPatients);
router.get("/getPatients/:doctorname", authController.getPatientsByDoctorName);
router.put("/updateHospital", authController.updateHospital);
router.put("/updateDisease", authController.updateDisease);
router.delete("/deleteHospital/:hospitalname", authController.deleteHospital);
router.delete("/deleteDisease/:diseasename", authController.deleteDisease);
router.delete("/deleteHealthTip/:healthtipname", authController.deleteHealthTip);
router.delete("/deleteMedicine/:medicinename", authController.deleteMedicine);

module.exports = router;
