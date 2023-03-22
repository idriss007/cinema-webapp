const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    movieIds: [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = mongoose.model("list", listSchema);