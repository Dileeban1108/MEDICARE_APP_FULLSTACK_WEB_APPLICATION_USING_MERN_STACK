const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subjectname: { type: String, required: true },
  grade: { type: String, required: true }
});

const studentGradeSchema = new Schema({
  studentnumber:{
        type:String,
        required:true
    },
  username:{
        type:String,
        required:true
    },
   department:{
    type: String,
    required: true
   },
  subjects: [subjectSchema]
});

module.exports = mongoose.model("Grade", studentGradeSchema);

