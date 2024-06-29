const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    coursecode: {
        type: String,
        required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
