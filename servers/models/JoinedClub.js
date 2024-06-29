const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joinedClubSchema = new Schema(
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
    clubname:{
        type: String,
        required: true, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JoinedClub", joinedClubSchema);
