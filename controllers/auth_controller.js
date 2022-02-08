module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("login", {title: "Square One | Login"});
}
module.exports.register = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("register", {title: "Square One | Register"});
}