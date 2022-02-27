const Admin = require("../models/admin")
const User = require("../models/users")
module.exports.home = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render('index', {title: 'Square One | Home'});
}
module.exports.recharge = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render('recharge', {title: "Square One | Recharge"});
}
module.exports.cart = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    try {
        console.log(req.user.id)
        let user = User.findById(req.user.id).populate('cartItems.item').exec((err, data) => {
            if (err) {
                return;
            }
            console.log(data);
        })
        console.log("user from cart", user)
    } catch (e) {
        return;
    }
    // console.log(req.user.cartItems)
    return res.render("cart", {title: "Square One | Cart"});
}
module.exports.profile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render("profile", {title: "Square One | Profile"});
}
module.exports.admin = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    try {
        let user = await Admin.findOne({name: req.user.name, email: req.user.email, password: req.user.password});
        if (user) {
            return res.render("admin", {title: "Square One | Admin"});
        } else {
            return res.redirect("/");
        }
    } catch (e) {
        console.log("Error while routing to admin page", e);
        return;
    }
}