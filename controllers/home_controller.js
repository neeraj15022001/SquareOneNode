module.exports.home = (req, res) => {
    if (req.cookies.squareOne) {
        let userFromCookies = JSON.parse(req.cookies.squareOne);
        return res.render('index', {title: 'Square One | Home', user: userFromCookies});
    }
    return res.render('index', {title: 'Square One | Home'});
}
    module.exports.recharge = (req, res) => {
        return res.render('recharge', {title: "Square One | Recharge"})
    }