const jwt = require("jsonwebtoken");

function signAccessToken(data) {
    // return new Promise((resolve, reject) => {
    //     const payload = {
    //         ...data,
    //     };

    //     const options = {
    //         expiresIn: "50s",
    //     };

    //     jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    //         if(err) {
    //             console.log(err);
    //             reject(err);
    //         }

    //         resolve(token);
    //     });
    // });

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    // res.json({accessToken});
    return accessToken;
};

function verifyAccessToken(req, res, next) {
    const token = req.headers["authorization"];
    
    if(!token) {
        // next(res.sendStatus(401));
        res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                // return next(res.sendStatus(401));
                return res.sendStatus(401);
            }
            req.payload = payload;
            next();
        });
    }

    
    
}

function signRefreshToken(data) {
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
    return refreshToken;
}

function verifyRefreshToken(req, res, next) {
    const token = req.headers["authorization"];

}

// function verifyAccessToken(req, res, next) {
    
//     const token = req.headers["authorization"];

//     if (!authorizationToken) {
// 		return "Bir hata oluştu!!!";
// 	}

//     const authorizationToken = token && token.split(" ")[1];

//     console.log(authorizationToken);

//     jwt.verify(authorizationToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
// 		if (err) {
// 			res.send(err.message);
// 		}

// 		req.payload = payload;
// 		next();
// 	});
// }

module.exports = { signAccessToken, verifyAccessToken, signRefreshToken };