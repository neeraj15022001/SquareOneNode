const User = require("../models/users");
const Item = require("../models/item");
module.exports.add = async (req, res) => {
    const addedItems = req.query.id;
    try {
        let user = await User.findById(req.user._id);
        console.log("User found", user, addedItems);
        let isPresent = false;
        let quantity = 1;
        let price = await Item.findById(addedItems).select("price")
        const currentItemPrice = price.price
        let userCartValue = user.totalCartValue + currentItemPrice;
        user.totalCartValue = userCartValue;
        user.totalCartItems = user.totalCartItems + 1;
        for await (const item of user.cartItems) {
            if (item.item == addedItems) {
                isPresent = true;
                item.quantity = item.quantity + 1;
                break;
            }
        }
        if (!isPresent) {
            let itemToBeAdded = {
                item: addedItems,
                quantity: quantity
            }
            user.cartItems.push(itemToBeAdded);
        }
        user.save()
        return res.redirect('back')
    } catch (e) {
        console.log("Error while retrieving user", e);
        return res.redirect("back")
    }
}
module.exports.increment = async (req, res) => {
    let itemToIncrement = req.query.id;
    try {
        let user = await User.findById(req.user._id);
        let price = await Item.findById(itemToIncrement).select("price")
        const currentItemPrice = price.price
        let userCartValue = user.totalCartValue + currentItemPrice;
        user.totalCartValue = userCartValue;
        user.totalCartItems = user.totalCartItems + 1;
        for await (const item of user.cartItems) {
            if (item.item == itemToIncrement) {
                item.quantity += 1;
                break;
            }
        }
        user.save();
        return res.redirect("back");
    } catch (e) {
        return res.redirect("back");
    }
}
module.exports.decrement = async (req, res) => {
    let itemToDecrement = req.query.id;
    try {
        let user = await User.findById(req.user._id);
        let price = await Item.findById(itemToDecrement).select("price")
        const currentItemPrice = price.price
        let userCartValue = user.totalCartValue - currentItemPrice;
        user.totalCartValue = userCartValue;
        user.totalCartItems = user.totalCartItems - 1;
        for await (const item of user.cartItems) {
            if (item.item == itemToDecrement) {
                if (item.quantity == 1) {
                    const index = user.cartItems.indexOf(item);
                    console.log("index of item", index);
                    user.cartItems.splice(index, 1);
                } else {
                    item.quantity -= 1;
                }
                break;
            }
        }
        user.save();
        return res.redirect("back");
    } catch (e) {
        return res.redirect("back");
    }
}
