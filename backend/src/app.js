require("dotenv").config(); // Environment değişkenlerimizi kullanmak için bunu require ediyoruz.
require("./clients/db");
const cors = require("cors");
const express = require("express");
const app = express();
// const passport = require("passport");
// const session = require("express-session");
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// const initializePassport = require("./passport-config");
// initializePassport(passport);

app.listen(4000, () => console.log("Server started on port 4000"));