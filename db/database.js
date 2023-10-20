require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'foogle'
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri, connectionParams);
        console.log('Connected to database');
    }catch(err){
        console.log('Error connecting to database: ', err);
    }
}

module.exports = connectDB;