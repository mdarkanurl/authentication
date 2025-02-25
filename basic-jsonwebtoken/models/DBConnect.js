const mongoose = require('mongoose');
require('dotenv').config();


const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database is connected');
    } catch (error) {
        console.log('Database is not connected');
        console.log(error.message);
    }
}

module.exports = DBConnect;