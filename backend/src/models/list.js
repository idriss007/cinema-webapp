const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "watchlist",
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    movieIds: [
        {
            type: String,
            // required: true
        }
    ]
});

module.exports = mongoose.model("list", listSchema);