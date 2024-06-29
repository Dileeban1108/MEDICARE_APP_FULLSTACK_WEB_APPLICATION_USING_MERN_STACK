const express = require("express");
const router = express.Router();
const otherController = require("../controllers/otherControllers");

router.post('/applyScolarship',otherController.applyScholarship );
router.post('/createScolarship',otherController.createScholarship );
router.post('/applyAdvancedCourse',otherController.applyAdvancedCourse );
router.post('/createAdvancedCourse',otherController.createAdvancedCourse );
router.post('/createClub',otherController.createClub );
router.post('/createAppeal',otherController.createAppeal );
router.post('/joinClub',otherController.joinClub );
router.get('/getScholarships', otherController.getScholarships);
router.get('/getAdvancedCourses', otherController.getAdvancedCourses);
router.get('/getClubs', otherController.getClubs);

module.exports = router;
