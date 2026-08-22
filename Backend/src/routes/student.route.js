const express = require("express")
const controllers = require("../controllers/students.controller")
const middleware = require("../middlewares/auth.middleware")

const studentRoute = express.Router()

studentRoute.post('/setup-profile' ,middleware, controllers.setupStudentProfile )

module.exports = studentRoute