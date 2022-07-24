const mongoose = require('mongoose')
require('dotenv').config('./.env')

const URL =  process.env.MONGO_URL

const connectTOMongo = () => {
    mongoose.connect(URL, () => {
        console.log('Successfully connected to MongoDb')
    })
}

module.exports = connectTOMongo