const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.put("/updateUser", authController.updateUser);
router.put("/updateLecturer", authController.updateLecturer);
router.put("/updateStudentWelfare", authController.updateStudentWelfare);
router.post("/login", authController.handleLogin);
router.post("/shedule", authController.handleNewShedule);
router.get("/getshedule", authController.getSchedule);
router.get("/getUser", authController.getUser);
router.get("/getUser/:email", authController.getUserByEmail);
router.get("/getUsers/:department", authController.getUserByDepartment);
router.delete("/deletelecture/:index", authController.deleteLecture);
router.get("/getReviews", authController.getReviews);
router.post("/createReview", authController.createReview);
router.post("/createAnnouncement", authController.handleNewAnnouncement);
router.get("/getAnnouncements", authController.getAnnouncements);
router.delete("/deleteAnnouncement", authController.deleteAnnouncement);


module.exports = router;
