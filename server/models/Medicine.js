const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    medicinename: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    unit: { type: String, required: true, enum: ["grams", "pills"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
