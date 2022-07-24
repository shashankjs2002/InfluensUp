const mongoose = require('mongoose')

const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: {
        type: String,
        required :true       
    },
    email : {
        type: String,
        required: true,
        // unique: true
    },
    password : {
        type: String,
        required: true
    },
    pass : {
        type: String,
    },
    contactNumber: {
        type: String
    },
    website: {
        type: String
    },
    activeCamp : {
        type: Number
    },

    totalCamp : {
        type: Number
    },

    category: {
        type: String,
    },
    message: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
    }
    
}, {timestamps: true})

const Brand = mongoose.model('Brand', BrandSchema)
Brand.createIndexes()

module.exports = Brand