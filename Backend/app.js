const express = require('express')
const connectDB = require ('./src/db/db')
const cookiesParser = require('cookie-parser')
const route = require('./src/routes/auth.route')
const teacherRoute = require("./src/routes/teacher.route")
const studentRoute = require("./src/routes/student.route")
const cors = require('cors')

require('dotenv').config()

const app = express()
connectDB()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));


app.use(express.json())
app.use(cookiesParser())
app.use(express.urlencoded({extended:true ,limit:"16kb"}))
app.use(express.static("public"))

app.use("/api/auth" , route)
app.use("/api/teacher" , teacherRoute)
app.use("/api/teacher" , studentRoute)


app.get("/" , (req , res) =>{
    res.send(`Hello Nikhil`)
})

module.exports= app