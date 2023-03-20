const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
});

// userSchema.plugin(passportLocalMongoose, {
//     usernameField: "email"
// }); //Şifreleri hashing yapmak ve kullanıcıları veritabanımıza kaydetmek için bunu kullanıyoruz.

module.exports = mongoose.model("user", userSchema);