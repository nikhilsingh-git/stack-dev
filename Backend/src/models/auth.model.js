const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "teacher" , "Admin"],
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.generateAuthToken = function(){
    const accessToken = jwt.sign({
        id: this._id,
        role:this.role
    }, process.env.JWT_SECRET ,
  {expiresIn:"1d"})

  return accessToken
}

const User = mongoose.model("User", userSchema);

module.exports = User