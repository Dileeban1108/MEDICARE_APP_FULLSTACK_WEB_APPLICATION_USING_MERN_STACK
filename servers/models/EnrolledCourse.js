const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrolledCourseSchema = new Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    coursecode: {
        type: String,
        required: true,
    },
    lecturername: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EnrolledCourse", enrolledCourseSchema);
