require("dotenv").config(); // Environment değişkenlerimizi kullanmak için bunu require ediyoruz.
require("./clients/db");
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(errorHandler);

app.listen(4000, () => console.log("Server started on port 4000"));
