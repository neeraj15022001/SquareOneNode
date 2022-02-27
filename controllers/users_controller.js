const User = require("../models/users")

module.exports.createUser = async (req, res) => {
    const user = req.body
    // console.log("User from req", user)
    if (user.password !== user.confirmPassword) {
        return res.redirect('back')
    }
    try {
        console.log(user.email)
        let userFound = await User.findOne({email: user.email});
        if (!userFound) {
            try {
                let userCreated = await User.create({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    cartItems: []
                });
                if (userCreated) {
                    console.log("User created succesfully", userCreated)
                    return res.redirect("/")
                }
            } catch (e) {
                console.log("Error while creating user", e);
            }
        } else {
            return res.redirect("/");
        }
    } catch (e) {
        console.log("Error while Searching User", e)
        return;
    }
}
module.exports.createSession = async (req, res) => {
    const userFromReq = req.body;
    try {
        const userFromDB = await User.findOne({email: userFromReq.email});
        if (userFromReq.password !== userFromDB.password) {
            return res.redirect('back')
        }
        console.log("Successfully found user", userFromDB);
        // res.cookie('squareOne', JSON.stringify(userFromDB));
        return res.redirect("/");
    } catch (e) {
        console.log("Error while finding user", e);
        return;
    }
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect("/login");
}