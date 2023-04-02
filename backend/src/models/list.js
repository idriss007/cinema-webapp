const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "watchlist",
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  movies: [
    {
      movie: Object,
    },
  ],
});

module.exports = mongoose.model("list", listSchema);
