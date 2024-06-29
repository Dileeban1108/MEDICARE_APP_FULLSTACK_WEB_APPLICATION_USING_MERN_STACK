const Course = require("../models/Course");
const EnrolledCourse = require("../models/EnrolledCourse");
const Assignment = require("../models/Assignment");
const Announcement = require("../models/Announcement");
const Grade = require("../models/Grade");
const Lecturer = require("../models/Lecturer");
const StudentWelfare = require("../models/StudentWelfare");
const Exam=require("../models/Exam")
const AdvancedCourse=require("../models/AdvancedCourse")
const Club=require("../models/Clubs")
const Scholarship=require("../models/Scholarship")
const createGrade = async (req, res) => {
  const { studentnumber,username, subjects,department } = req.body;

  if (!studentnumber  || !subjects || !Array.isArray(subjects)) {
    return res.status(400).json({ message: "Please fill out all required fields and ensure subjects is an array" });
  }

  try {
    const newGrade = await Grade.create({
      username:username,
      studentnumber: studentnumber,
      subjects: subjects,
      department:department
    });
    res.status(201).json({ message: 'Grade saved successfully', grade: newGrade });
  } catch (err) {
    console.error('Error saving grade:', err);
    res.status(500).json({ message: 'Error saving grade', error: err });
  }
};
const getStudentGrade = async (req, res) => {
  try {
    const { studentnumber } = req.params;
    const additionalFilters = req.query; // Using query parameters for filters

    // Construct the query object
    const query = { studentnumber, ...additionalFilters };

    // Fetch the grades matching the query
    const results = await Grade.find(query);

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Grades not found" });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student grades" });
  }
};
const getStudentGradeByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const additionalFilters = req.query; // Using query parameters for filters

    // Construct the query object
    const query = { department, ...additionalFilters };

    // Fetch the grades matching the query
    const results = await Grade.find(query);

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Grades not found" });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student grades" });
  }
};
const updateStudentGrade = async (req, res) => {
  try {
    const { email } = req.params;
    const { subjects } = req.body;
    const updatedGrade = await Grade.findOneAndUpdate(
      email,
      { subjects },
      { new: true }
    );
    if (!updatedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }
    res.status(200).json(updatedGrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update student grade" });
  }
};

const deleteStudentGrade = async (req, res) => {
  try {
    const { studentnumber } = req.params;
    const deletedGrade = await Grade.findOneAndDelete(studentnumber);
    if (!deletedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }
    res.status(200).json({ message: "Grade deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete student grade" });
  }
}
const deleteScholarship = async (req, res) => {
  try {
    const { name } = req.params;
    const deleteScholarship = await Scholarship.findOneAndDelete(name);
    if (!deleteScholarship) {
      return res.status(404).json({ error: " not found" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}
const deleteClub = async (req, res) => {
  try {
    const { name } = req.params;
    const deleteClub = await Club.findOneAndDelete(name);
    if (!deleteClub) {
      return res.status(404).json({ error: " not found" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}
const deleteAdvancedCourse = async (req, res) => {
  try {
    const { name } = req.params;
    const deleteAdvancedCourse = await AdvancedCourse.findOneAndDelete(name);
    if (!deleteAdvancedCourse) {
      return res.status(404).json({ error: " not found" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}
  const removeEnrolledCourse = async (req, res) => {
    try {
      const { coursecode } = req.params;
  
      // Correct query object for findOneAndDelete
      const deleteEnrolledCourse = await EnrolledCourse.findOneAndDelete({ coursecode });
      
      if (!deleteEnrolledCourse) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete course" });
    }
  };
  

const getLecturer = async (req, res) => {
  try {
    const { department } = req.params; 
    const additionalFilters = req.body; 

    // Construct the query object
    const query = { department, ...additionalFilters };

    // Fetch the lecturer matching the query
    const result = await Lecturer.findOne(query);

    // Send the result back to the client
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch lecturers" });
  }
};
const getLecturerByEmail = async (req, res) => {
  try {
    const { email } = req.params; 
    const additionalFilters = req.body; 
    
    const query = { email, ...additionalFilters };


    const result = await Lecturer.findOne(query);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Lecturer not found" });
    }
  } catch (error) {
    console.error("Error fetching lecturer:", error);
    res.status(500).json({ error: "Failed to fetch lecturer" });
  }
};
const getStudentWelfareByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const welfare = await StudentWelfare.findOne({ email });
    if (!welfare) {
      return res.status(404).json({ message: 'Welfare officer not found' });
    }
    res.status(200).json(welfare);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch welfare officer' });
  }
};

const handleNewCourse = async (req, res) => {
  const { coursename, coursecode, lecturername, faculty, department } =
    req.body;
  if (!coursename || !coursecode || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    const newCourse = await Course.create({
      coursename: coursename,
      coursecode: coursecode,
      lecturername: lecturername,
      faculty: faculty,
      department: department,
    });

    res.status(200).json({ success: "New course created" });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the course" });
  }
};
const handleNewAdvancedCourse = async (req, res) => {
  const { name, description, deadline} =
    req.body;
  if (!name || !description || !deadline)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await AdvancedCourse.create({
      name: name,
      description: description,
      deadline: deadline,
    });

    res.status(200).json({ success: "New course created" });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the course" });
  }
};
const handleNewScholarship = async (req, res) => {
  const { name, description, deadline} =
    req.body;
  if (!name || !description || !deadline)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    await Scholarship.create({
      name: name,
      description: description,
      deadline: deadline,
    });

    res.status(200).json({ success: "New Scholarship created" });
  } catch (error) {
    console.error("Error creating Scholarship:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the Scholarship" });
  }
};
const handleNewClub = async (req, res) => {
  const { name, description} =
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

    res.status(200).json({ success: "New club created" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the club" });
  }
};
const getCourses = async (req, res) => {
  try {
    const { department } = req.params;
    const additionalFilters = req.body;

    // Ensure department is included in the query
    const query = { department, ...additionalFilters };

    // Fetch all courses matching the query
    const results = await Course.find(query);

    // Send the results back to the client
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const handleNewAssignment = async (req, res) => {
  const {
    coursename,
    coursecode,
    lecturername,
    description,
    faculty,
    department,
    deadline,
    assignmentname,
  } = req.body;
  if (!coursename || !coursecode || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    const newAssignment = await Assignment.create({
      coursename: coursename,
      coursecode: coursecode,
      lecturername: lecturername,
      faculty: faculty,
      department: department,
      deadline: deadline,
      assignmentname: assignmentname,
      description:description,
    });

    res.status(200).json({ success: "New course created" });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the course" });
  }
};
const handleNewAnnouncement = async (req, res) => {
  const { image, description } = req.body;

  if (!image || !description) {
    return res.status(400).json({ message: "Please fill out all required fields" });
  }

  try {
    await Announcement.create({
      image: image,
      description: description,
    });

    res.status(200).json({ success: "New announcement created" });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "An error occurred while creating the announcement" });
  }
};

const handleNewExam = async (req, res) => {
  const {
    coursename,
    coursecode,
    date,
    faculty,
    department,
    time,
    location,
  } = req.body;
  if (!coursename || !coursecode || !faculty || !department)
    return res
      .status(400)
      .json({ message: "Please fill out all required fields" });

  try {
    const newExam = await Exam.create({
      coursename: coursename,
      coursecode: coursecode,
      date: date,
      faculty: faculty,
      department: department,
      time: time,
      location: location,
    });

    res.status(200).json({ success: " created" });
  } catch (error) {
    console.error("Error :", error);
    res
      .status(500)
      .json({ error: "An error occurred" });
  }
};
const getAssignment = async (req, res) => {
  try {
    const { department } = req.params;
    const additionalFilters = req.body;

    // Construct the query object
    const query = { department, ...additionalFilters };

    // Fetch the lecturer matching the query
    const result = await Assignment.findOne(query);

    // Send the result back to the client
    res.status(200).json(result);
    console.log(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Assignments" });
  }
};
const getExams = async (req, res) => {
  try {
    const { department } = req.params;
    const additionalFilters = req.body;

    const query = { department, ...additionalFilters };

    const result = await Exam.findOne(query);
console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const handleNewEnrolledCourse = async (req, res) => {
  const { coursename, coursecode, lecturername, faculty, department, email } = req.body;

  if (!coursename || !coursecode || !faculty || !department || !email) {
    return res.status(400).json({ message: "Please fill out all required fields" });
  }

  try {
    // Check for duplicate enrolled course
    const duplicateEnrolledCourse = await EnrolledCourse.findOne({
      email: email,
      coursecode: coursecode
    }).exec();

    if (duplicateEnrolledCourse) {
      return res.status(409).json({ message: "You are already enrolled in this course" });
    }

    // Create new enrolled course
    const newEnrolledCourse = await EnrolledCourse.create({
      coursename: coursename,
      coursecode: coursecode,
      lecturername: lecturername,
      faculty: faculty,
      department: department,
      email: email
    });

    res.status(200).json({ success: "New course enrolled" });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ error: "An error occurred while enrolling in the course" });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const { email } = req.params;
    const additionalFilters = req.body;

    const query = { email, ...additionalFilters };

    const result = await EnrolledCourse.find(query);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch enrolled courses" });
  }
};

module.exports = {
  getLecturer,
  handleNewCourse,
  getCourses,
  handleNewAssignment,
  getAssignment,
  handleNewEnrolledCourse,
  getEnrolledCourses,
  createGrade,
  getStudentGrade,
  updateStudentGrade,
  deleteStudentGrade, 
  getLecturerByEmail,
  handleNewExam,
  getExams,
  removeEnrolledCourse,
  getStudentGradeByDepartment,
  getStudentWelfareByEmail,
  handleNewAdvancedCourse,
  handleNewScholarship,
  handleNewClub,
  deleteScholarship,
  deleteClub,
  deleteAdvancedCourse,
  handleNewAnnouncement
};
