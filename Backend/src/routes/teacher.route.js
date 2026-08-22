const express = require("express")
const controllers = require("../controllers/teacher.controller")
const middleware = require("../middlewares/auth.middleware")

const teacherRoute = express.Router()

teacherRoute.post('/setup-profile' ,middleware, controllers.setupTeacherProfile )
teacherRoute.patch('/update-profile' ,middleware, controllers.updateTeacherProfile )

module.exports = teacherRoute