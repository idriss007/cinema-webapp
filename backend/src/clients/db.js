const mongoose = require("mongoose");
// require("dotenv").config();

// mongoose
//   .connect("mongodb://localhost:27017/CinemaWebAppDB")
//   .then(() => console.log("Connected to mongo server."));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_ATLAS_ADMIN_USERNAME}:${process.env.MONGODB_ATLAS_ADMIN_PASSWORD}@cluster0.dql4xln.mongodb.net/CinemaWebAppDB`
  )
  .then(() => console.log("Connected to mongo server."));
