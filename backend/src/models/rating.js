const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  // list: {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "list",
  //     required: true
  // },
  // movie_id: {
  //     type: String,
  //     required: true
  // },
  // ratingValue: {
  //     type: String,
  //     required: true
  // }
  rating: [
    {
      movie_id: {
        type: String,
        required: true,
      },
      ratingValue: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("rating", ratingSchema);
