const User = require("../../models/user");
const passport = require("passport");

const Register = async (req, res, next) => {
    const input = req.body;
    const isExist = await User.exists({email: input.email});
    
    if(isExist) {console.log("Email already exists. Please sign up with a different email."); return;}

    // try {
    //     const user =  await User.create(input);
    //     console.log(user);
    //     res.send(user);
    // } catch (err) {console.log(err.message);}

    // const newUser = new User({email: input.email, password: input.password});
    // console.log(newUser);
    console.log(input);

    User.register({email: input.email, password: input.password}, input.password, function(err, user) { // function'da kullanılan user, yeni kaydedilmiş olan kullanıcıyı temsil eder.
        if(err) {
            console.log(err);
            res.send("http://localhost:3000/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.send(user);
            });
        }
    })
    
}

const Login = async (req, res, next) => {
    const input = req.body;
    
    try{
        const findUser = await User.find({email: input.email, password: input.password});
        if(findUser.length >= 1) {
            console.log(findUser);
            res.send("Successfully logged in.");
            res.end();
        } else {
            console.log("Bu bilgilerle eşleşen kullanıcı bulunamadı.");
            res.send("Bu bilgilerle eşleşen kullanıcı bulunamadı.");
        }
        
    } catch(err) {console.log(err.message);}


}

module.exports = {Register, Login};