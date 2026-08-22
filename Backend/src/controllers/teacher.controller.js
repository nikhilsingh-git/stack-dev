const Teacher = require("../models/teacher.model");


const setupTeacherProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      employeeId,
      gender,
      dateOfBirth,
      department,
      designation,
      qualification,
      experience,
      subjects,
      address,
      city,
      state,
      pincode,
      joiningDate,
      profileImage,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !employeeId ||
      !gender ||
      !department ||
      !designation ||
      !qualification ||
      !joiningDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(409).json({
        success: false,
        message: "Teacher profile already exists with this email",
      });
    }

    const existingEmployee = await Teacher.findOne({ employeeId });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    const teacher = await Teacher.create({
      name,
      email,
      phone,
      employeeId,
      gender,
      dateOfBirth,
      department,
      designation,
      qualification,
      experience,
      subjects,
      address,
      city,
      state,
      pincode,
      joiningDate,
      profileImage,
    });

    return res.status(201).json({
      success: true,
      message: "Teacher profile created successfully",
      teacher,
    });
  } catch (error) {
    console.error("Teacher profile setup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  setupTeacherProfile,
};