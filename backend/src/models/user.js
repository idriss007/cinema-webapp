const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  profile_image: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("user", userSchema);
