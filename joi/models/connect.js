require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database is connected');
    } catch (error) {
        console.log('Database is not connected');
        console.log(error);
    }
}

module.exports = connectDB