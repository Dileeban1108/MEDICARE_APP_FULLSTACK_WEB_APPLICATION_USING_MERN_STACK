const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const advancedCourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline:{
        type: String,
        required: true,    
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdvancedCourse", advancedCourseSchema);
