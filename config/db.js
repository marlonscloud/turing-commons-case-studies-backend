const mongoose = require('mongoose')
const colors = require('colors');

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Mongo DB Connected: ${conn.connection.host}`.blue.bold)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB