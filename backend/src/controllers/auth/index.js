const User = require("../../models/user");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../../helpers/jwt");
// const user = require("../../models/user");

const Register = async (req, res, next) => {
    const input = req.body;
    const isExist = await User.exists({email: input.email});
    
    if(isExist) {console.log("Email already exists. Please sign up with a different email."); return;}

    try {
        const registeredUser =  await User.create(input);
        // console.log(registeredUser);

        const accessToken = await signAccessToken({ user_id: registeredUser._id });
        const refreshToken = await signRefreshToken({ user_id: registeredUser._id });
    
        res.json({
            user: registeredUser,
            accessToken,
            refreshToken
        });
        
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
    
}

const Login = async (req, res, next) => {
    const input = req.body;
    
    try{
        const findUser = await User.findOne({email: input.email, password: input.password}).select("--password");
        // if(findUser.length >= 1) {
        //     console.log(findUser);
        //     res.send("Successfully logged in.");
        //     res.end();
        // } else {
        //     console.log("Bu bilgilerle eşleşen kullanıcı bulunamadı.");
        //     res.send("Bu bilgilerle eşleşen kullanıcı bulunamadı.");
        // }
        if(!findUser) {
            res.sendStatus(400);
        } else {
            const accessToken = await signAccessToken({ user_id: findUser._id });
            const refreshToken = await signRefreshToken({ user_id: findUser._id });

            // const userData = findUser.toObject();
            // delete userData.password;
		    // delete userData.__v;

            res.json({
                user: findUser,
                accessToken,
                refreshToken
            });
        }
        
    } catch(err) {console.log(err.message);}
}

const RefreshToken = async (req, res, next) => {
    const { refresh_token } = req.body;

    if(!refresh_token) {
        console.log("There is no refresh token");
        return res.sendStatus(400);
    }

    try {
        const user_id = await verifyRefreshToken(refresh_token);
        const user = await User.findById(user_id);
        const accessToken = await signAccessToken({user_id});
	    const refreshToken = await signRefreshToken({user_id});
        res.json({ user, accessToken, refreshToken });
    } catch(err) {
        res.send(err);
    }
}

const Me = async (req, res, next) => {
    const { user_id } = req.payload;
    try {
        const user = await User.findById(user_id);
        // console.log(user);
        res.json(user);
    } catch(err) {
        res.send(err.message);
    }
}

const Logout = (req, res, next) => {
    const { refresh_token } = req.body;
    res.json({ message: "success" })
}

module.exports = { Register, Login, Me, Logout, RefreshToken };