const Items = require("../models/item")
module.exports.menu = async (req, res) => {
    try {
        let foodItems = await Items.find({category: "food"});
        let beverages = await Items.find({category: "beverage"});
        const items = {};
        items.food = foodItems;
        items.beverage = beverages;
        return res.render('menu', {title: "Square One | Menu", items: items});
    } catch (error) {
        console.log("Error while retrieveing Items", error);
    }
    return res.render('menu', {title: "Square One | Menu", items: []})
}