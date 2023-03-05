const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}))

/*app.post("/", function(req, res) {
    console.log(req.body);
});*/

const Register = async (req, res, next) => {
	const input = req.body;
    console.log(input);
}

app.listen(4000, () => console.log("Server started on port 4000"));

export default Register;