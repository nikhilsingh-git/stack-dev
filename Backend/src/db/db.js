const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`Database is connected!`)
    } catch (error) {
        console.log(`Database is not connect!`)
        process.exit(1)
    }    
}

module.exports = connectDB