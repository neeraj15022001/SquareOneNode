const User = require("../models/users")
module.exports.createUser = async (req, res) => {
    const user = req.body;
    if (user.password === user.confirmPassword) {
        try {
            let userFromDB = await User.create({name: user.name, password: user.password, email: user.email});
            console.log("User Created Successfully", userFromDB)
            return res.redirect("/")
        } catch (e) {
            console.log("Error while creating user", e);
            return;
        }
    } else {
        return res.redirect('back');
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