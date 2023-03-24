const jwt = require("jsonwebtoken");

function signAccessToken(data) {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"});
    // const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    // res.json({accessToken});
    return accessToken;
};

function verifyAccessToken(req, res, next) {
    const token = req.headers["authorization"];
    
    if(!token) {
        // next(res.sendStatus(401));
        res.sendStatus(400);
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

function verifyRefreshToken(refresh_token) {
    return new Promise((resolve, reject) => {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if(err) {
                return reject(res.sendStatus(401));
            } else {
                const { user_id } = payload;
                return resolve(user_id);
            }
        })
    })

    
}

// function verifyTokens(req, res, next) {
//     const data = req.headers["authorization"];
//     const tokens = data.split(",");
//     const token = tokens[0];
//     const refreshToken = tokens[1];

//     console.log(token);
//     console.log(refreshToken);

//     // res.sendStatus(401);
//     return next();
    
// }

module.exports = { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken };