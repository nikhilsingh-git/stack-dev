const Student = require("../models/student.model");

const setupStudentProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      rollNumber,
      course,
      branch,
      semester,
      admissionYear,
      address,
      city,
      state,
      pincode,
      guardianName,
      guardianPhone,
      profileImage,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !rollNumber ||
      !course ||
      !branch ||
      !semester
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student profile already exists",
      });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      rollNumber,
      course,
      branch,
      semester,
      admissionYear,
      address,
      city,
      state,
      pincode,
      guardianName,
      guardianPhone,
      profileImage,
    });

    return res.status(201).json({
      success: true,
      message: "Student profile created successfully",
      student,
    });
  } catch (error) {
    console.error("Student profile setup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  setupStudentProfile,
};