const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
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
    deadline: {
      type: String,
      required: true,
    },
    assignmentname: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
