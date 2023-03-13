const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CinemaWebAppDB").then(() => console.log("Connected to mongo server."));