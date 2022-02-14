const User = require("../models/users");
module.exports.add = async (req, res) => {
    const addedItems = req.query.id;
    try {
        let user = await User.findById(req.user._id);
        console.log("User found", user);
    } catch (e) {
        console.log("Error while retrieving user", e);
        return res.redirect("back")
    }


}