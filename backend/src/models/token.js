const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model("token", tokenSchema);
