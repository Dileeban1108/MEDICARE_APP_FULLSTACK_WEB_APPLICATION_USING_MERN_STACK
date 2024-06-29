const AppliedScholarship = require("../models/AppliedScholarship");
const AppliedAdvancedCourse = require("../models/AppliedAdvancedCourses");
const Appeal = require("../models/Appeals");
const JoinedClub = require("../models/JoinedClub");
const Club = require("../models/Clubs");
const AdvancedCourse = require("../models/AdvancedCourse");
const Scholarship = require("../models/Scholarship");


const applyScholarship = async (req, res) => {
  const {
    username,
    studentnumber,
    email,
    faculty,
    department,
    description,
    scholarshipname,
  } = req.body;
  if (!username || !studentnumber || !email || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await AppliedScholarship.create({
      username: username,
      studentnumber: studentnumber,
      email: email,
      faculty: faculty,
      department: department,
      description: description,
      scholarshipname: scholarshipname,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const applyAdvancedCourse = async (req, res) => {
  const {
    username,
    studentnumber,
    email,
    faculty,
    department,
    description,
    coursename,
  } = req.body;
  if (!username || !studentnumber || !email || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await AppliedAdvancedCourse.create({
      username: username,
      studentnumber: studentnumber,
      email: email,
      faculty: faculty,
      department: department,
      description: description,
      coursename: coursename,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const createAppeal = async (req, res) => {
  const { username, studentnumber, email, faculty, department, description } =
    req.body;
  if (!username || !studentnumber || !email || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await Appeal.create({
      username: username,
      studentnumber: studentnumber,
      email: email,
      faculty: faculty,
      department: department,
      description: description,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const createScholarship = async (req,res)=> {
    const { name, description,deadline } =
    req.body;
  if (!name || !description || !deadline )
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await Scholarship.create({
        name: name,
        description: description,
        deadline: deadline,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
const createAdvancedCourse = async (req,res)=> {
    const { name, description,deadline } =
    req.body;
  if (!name || !description || !deadline )
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await AdvancedCourse.create({
        name: name,
        description: description,
        deadline: deadline,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
const createClub = async (req,res)=> {
    const { name, description } =
    req.body;
  if (!name || !description )
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await Club.create({
        name: name,
        description: description,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
const joinClub = async (req, res) => {
  const {
    username,
    studentnumber,
    email,
    faculty,
    department,
    description,
    clubname,
  } = req.body;
  if (!username || !studentnumber || !email || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await JoinedClub.create({
      username: username,
      studentnumber: studentnumber,
      email: email,
      faculty: faculty,
      department: department,
      description: description,
      clubname: clubname,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error create:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const getScholarships = async (req, res) => {
  try {
    const scholarship = await Scholarship.find();
    res.status(200).json(scholarship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getAdvancedCourses = async (req, res) => {
  try {
    const advancedCourse = await AdvancedCourse.find();
    res.status(200).json(advancedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
module.exports = {
  applyScholarship,
  applyAdvancedCourse,
  createAppeal,
  joinClub,
  getClubs,
  getAdvancedCourses,
  getScholarships,
  createScholarship,
  createAdvancedCourse,
  createClub
};
