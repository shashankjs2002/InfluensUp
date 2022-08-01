const mongoose = require('mongoose')

const { Schema } = mongoose;

const CampaignSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },   
    brandName:{
        type: String,
        // required :true       
    },
    campaignName:{
        type: String,
        required :true       
    },
    description : {
        type: String,
        required: true,
    },
    startDate : {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
        // required: true
    },
    budget : {
        type: Number,
    },
    campaignType: {
        type: String
    },
    influencers: [{type: Object}]
    
    
}, {timestamps: true})

const Campaign = mongoose.model('Campaign', CampaignSchema)
Campaign.createIndexes()

module.exports = Campaign