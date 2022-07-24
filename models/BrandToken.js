const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {expireAfterSeconds:300});

const BrandToken = mongoose.model("BrandToken", tokenSchema);

module.exports = BrandToken;