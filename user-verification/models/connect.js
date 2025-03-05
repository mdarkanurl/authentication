const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB is connected');
    console.log(error.message);        
    }
}

module.exports = connect