const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:27017/CinemaWebAppDB")
//   .then(() => console.log("Connected to mongo server."));

mongoose
  .connect(
    "mongodb+srv://admin-idris:idris123.@cluster0.dql4xln.mongodb.net/CinemaWebAppDB"
  )
  .then(() => console.log("Connected to mongo server."));
