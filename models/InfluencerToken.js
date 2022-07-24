const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Influencer",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {expireAfterSeconds:300});

const InfluencerToken = mongoose.model("InfluencerToken", tokenSchema);

module.exports = InfluencerToken;