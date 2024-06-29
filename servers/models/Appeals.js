const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appealSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    studentnumber: {
        type: String,
        required: true,
    },
    email:{
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
    description: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appeal", appealSchema);
