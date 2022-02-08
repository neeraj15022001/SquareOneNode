module.exports.home = (req, res) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render('index', {title: 'Square One | Home'});
}
module.exports.recharge = (req, res) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render('recharge', {title: "Square One | Recharge"});
}
module.exports.cart = (req, res) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render("cart", {title: "Square One | Cart"});
} 
module.exports.profile = (req, res) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return res.render("profile", {title: "Square One | Profile"});
} 