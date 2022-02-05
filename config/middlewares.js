module.exports.checkUser = (req, res, next) => {
    console.log("Checking User")
    if (req.cookies.squareOne) {
        console.log("Checking User ----> User Found", JSON.parse(req.cookies.squareOne))
        return next();
    }
    return res.redirect("/login")
}