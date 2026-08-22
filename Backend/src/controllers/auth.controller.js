const User = require("../models/auth.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(401).json({
        success: false,
        message: "All Data is required!",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      phone,
      role,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not Register!",
      });
    }

    const accessToken = user.generateAuthToken();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User register successfully!",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Somthing want worng!",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { phoneOrEmail, password  } = req.body;
    if (!phoneOrEmail || !password) {
      return res.status(401).json({
        success: false,
        message: "All data is required!",
      });
    }

     const user = await User.findOne({
        $or: [{ email: phoneOrEmail }, { phone: phoneOrEmail }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: " Invalid email or password!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const accessToken = user.generateAuthToken();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User login successfully!",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Somthing want worng!",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not login! ",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User fatched successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { register, login, logout, getSingleUser};
