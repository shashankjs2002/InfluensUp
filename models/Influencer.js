const mongoose = require('mongoose')

const { Schema } = mongoose;

const InfluencerSchema = new Schema({
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
    ytlink: {
        type: String
    },
    iglink: {
        type: String
    },
    ytsubs: {
        type: String
    },
    igfollowers: {
        type: String
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
    },
    campaigns:[{type: Schema.Types.ObjectId,
        ref: "Campaign"}]
    
}, {timestamps: true})

const Influencer = mongoose.model('Influencer', InfluencerSchema)
Influencer.createIndexes()

module.exports = Influencer