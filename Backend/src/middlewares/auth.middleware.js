const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
   
    const token = req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.body?.accessToken;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "User is not Login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id , role:decoded.role };
    
    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somthing want worng!",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
