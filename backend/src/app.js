require("dotenv").config(); // Environment değişkenlerimizi kullanmak için bunu require ediyoruz.
require("./clients/db");
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

app.listen(4000, () => console.log("Server started on port 4000"));