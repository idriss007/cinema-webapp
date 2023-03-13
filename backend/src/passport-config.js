const User = require("./models/user");

function initialize(passport) {
    passport.use(User.createStrategy({userNameField: "email"}, User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

module.exports = initialize;