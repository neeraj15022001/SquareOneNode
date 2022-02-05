module.exports.home = (req, res) => {
    return res.render('index', {title: 'Square One | Home'});
}
module.exports.recharge = (req, res) => {
    return res.render('recharge', {title: "Square One | Recharge"})
}