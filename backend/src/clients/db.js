const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:27017/CinemaWebAppDB")
//   .then(() => console.log("Connected to mongo server."));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_ATLAS_ADMIN_USERNAME}:${process.env.MONGODB_ATLAS_ADMIN_PASSWORD}
    @${process.env.MONGODB_ATLAS_CLUSTER}`
  )
  .then(() => console.log("Connected to mongo server."));
