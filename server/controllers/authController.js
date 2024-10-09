const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const Disease = require("../models/Disease");
const Medicine = require("../models/Medicine");
const HealthTip = require("../models/HealthTip");
const BookDoctor = require("../models/BookedDocter");
const bcrypt = require("bcrypt");
const Review=require("../models/Review")
const { generateAccessToken, generateRefreshToken } = require("../utills/generateTokens");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "email and passwords are required" });

  const foundUser = await Doctor.findOne({ email}).exec();
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });;
  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (matchPassword) {
      // Generate tokens
      const accessToken = generateAccessToken(foundUser);
      const refreshToken = generateRefreshToken(foundUser);
  
      // Save refresh token in the database
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
  
      // Set refresh token as an HTTP-only secure cookie
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      });
  
      // Send access token to client
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
};
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  // Check if refresh token exists in the database
  const foundUser = await Doctor.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err || foundUser.email.toString() !== decoded.email) {
      // If there is an error or the user ID in the token doesn't match the found user's ID
      return res.status(403).json({ message: "Forbidden" });
    }
  
    // Proceed to generate new access and refresh tokens
    const newRefreshToken = generateRefreshToken(foundUser);
    foundUser.refreshToken = newRefreshToken;
    await foundUser.save();
  
    // Set the new refresh token in the cookie
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000
    });
  
    // Generate a new access token and send it back
    const newAccessToken = generateAccessToken(foundUser);
    res.json({ accessToken: newAccessToken });
  });
  
};
const handleNewHospital = async (req, res) => {
  const { hospitalname, phone, address } = req.body;
  if (!hospitalname || !phone || !address)
    return res
      .status(400)
      .json({ message: "hospitalname,address and contact is required" });

  const duplicateHospital = await Hospital.findOne({
    hospitalname: hospitalname,
  }).exec();
  if (duplicateHospital)
    return res.status(409).json({ message: "hospital name is already exist" });

  try {
    const newHospital = await Hospital.create({
      hospitalname: hospitalname,
      phone: phone,
      address: address,
    });

    res
      .status(200)
      .json({ success: `new hospital with ${hospitalname} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const getHospitals = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Hospital.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};
const updateHospital = async (req, res) => {
  try {
    const { hospitalname, address, phone } = req.body;

    const query = { hospitalname };

    const updatedHospital = await Hospital.findOneAndUpdate(
      query,
      { address, phone },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update hospital" });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { hospitalname } = req.params;

    const query = { hospitalname };

    const deletedHospital = await Hospital.findOneAndDelete(query);

    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete hospital" });
  }
};

const handleNewDisease = async (req, res) => {
  const { diseasename, description, symptoms, treatment } = req.body;
  if (!diseasename || !description || !symptoms || !treatment)
    return res
      .status(400)
      .json({ message: "hospitalname,address and contact is required" });

  const duplicateDisease = await Disease.findOne({
    diseasename: diseasename,
  }).exec();
  if (duplicateDisease)
    return res.status(409).json({ message: "disease is already exist" });

  try {
    const newDisease = await Disease.create({
      diseasename: diseasename,
      description: description,
      symptoms: symptoms,
      treatment: treatment,
    });

    res
      .status(200)
      .json({ success: `new Disease with ${diseasename} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const handleNewMedicine = async (req, res) => {
  const { medicinename, quantity} = req.body;
  if (!medicinename || !quantity)
    return res
      .status(400)
      .json({ message: "something is required" });

  const duplicateMedicine = await Medicine.findOne({
    medicinename: medicinename,
  }).exec();
  if (duplicateMedicine)
    return res.status(409).json({ message: "medicine is already exist" });

  try {
    await Medicine.create({
      medicinename: medicinename,
      quantity: quantity,
    });

    res
      .status(200)
      .json({ success: `new Medicine with ${medicinename} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const handleNewHealthTip = async (req, res) => {
  const { healthtipname, username, description } = req.body;
  if (!healthtipname) return res.status(400).json({ message: "required" });

  const duplicateHealthTip = await Disease.findOne({
    healthtipname: healthtipname,
  }).exec();
  if (duplicateHealthTip)
    return res.status(409).json({ message: "already exist" });

  try {
    const newHealthTip = await HealthTip.create({
      healthtipname: healthtipname,
      username: username,
      description: description,
    });

    res
      .status(200)
      .json({ success: `new Disease with ${healthtipname} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const createReview = async (req, res) => {
  const {name, review ,rating} = req.body;
  if (!review) return res.status(400).json({ message: "required" });

  try {
    await Review.create({
      name: name,
      review: review,
      rating:rating,
    });

    res
      .status(200)
      .json({ success: `new review created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const bookDoctor = async (req, res) => {
  const { doctorname, username, email, age, address, regnumber } = req.body;
  if (!doctorname || !username || !email || !age || !address || !regnumber)
    return res.status(400).json({ message: "something went wrong" });

  const duplicatePatient = await BookDoctor.findOne({
    username: username,
    doctorname:doctorname
  }).exec();
  if (duplicatePatient)
    return res.status(409).json({ message: "already exist" });
  try {
    await BookDoctor.create({
      doctorname: doctorname,
      username: username,
      email: email,
      age: age,
      address: address,
      regnumber: regnumber,
    });

    res.status(200).json({ success: `new Book with ${doctorname} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const getReviews = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Review.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getPatients = async (req, res) => {
  try {
    const filters = req.body;

    const result = await BookDoctor.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getPatientsByDoctorName = async (req, res) => {
  try {
    const { doctorname } = req.params;
    const additionalFilters = req.body;

    const query = { doctorname, ...additionalFilters };

    const result = await BookDoctor.find(query); // Use find instead of findOne to get all matching documents
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

const getDisease = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Disease.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getHealthTips = async (req, res) => {
  try {
    const filters = req.body;

    const result = await HealthTip.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getMedicines = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Medicine.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

const updateDisease = async (req, res) => {
  try {
    const { diseasename, description, symtems, treatment } = req.body;

    const query = { diseasename };
    const updatedDisease = await Disease.findOneAndUpdate(
      diseasename,
      { description, symtems, treatment },
      { new: true }
    );
    if (!updatedDisease) {
      return res.status(404).json({ error: "Disease  not found" });
    }
    res.status(200).json(updatedDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update" });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const { diseasename } = req.params;
    const query = { diseasename };

    const deleteDisease = await Disease.findOneAndDelete(query);
    if (!deleteDisease) {
      return res.status(404).json({ error: "disease not found" });
    }
    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const deleteHealthTip = async (req, res) => {
  try {
    const { healthtipname } = req.params;
    const query = { healthtipname };

    const deleteHealthTip = await HealthTip.findOneAndDelete(query);
    if (!deleteHealthTip) {
      return res.status(404).json({ error: " not found" });
    }
    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const deleteMedicine = async (req, res) => {
  try {
    const { medicinename } = req.params;
    const query = { medicinename };

    const deleteMedicine = await Medicine.findOneAndDelete(query);
    if (!deleteMedicine) {
      return res.status(404).json({ error: " not found" });
    }
    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const getDoctorByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const additionalFilters = req.body;

    const query = { email, ...additionalFilters };

    const result = await Doctor.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getDoctorByRole = async (req, res) => {
  try {
    const { specialization } = req.params;
    const additionalFilters = req.body;

    const query = { specialization, ...additionalFilters };

    const result = await Doctor.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports = {
  handleLogin,
  handleNewDisease,
  deleteDisease,
  deleteHospital,
  getHospitals,
  getDisease,
  handleNewHospital,
  updateDisease,
  updateHospital,
  getDoctorByEmail,
  handleNewHealthTip,
  deleteHealthTip,
  bookDoctor,
  getDoctorByRole,
  getPatients,
  getPatientsByDoctorName,
  createReview,
  getReviews,
  getMedicines,
  handleNewMedicine,
  getHealthTips,
  deleteMedicine,
  handleRefreshToken
};
