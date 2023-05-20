const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    minLength: 15,
  },
  parentId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "comment",
    default: null,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    // default: () => Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isDeletedContent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("comment", commentSchema);
