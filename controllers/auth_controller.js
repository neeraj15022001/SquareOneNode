module.exports.login = (req, res) => {
    return res.render("login", {title: "Square One | Login"});
}
module.exports.register = (req, res) => {
    return res.render("register", {title: "Square One | Register"});
}