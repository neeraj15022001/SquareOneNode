const User = require("../models/users");
const {cart} = require("./home_controller");
module.exports.add = async (req, res) => {
    const addedItems = req.query.id;
    try {
        let user = await User.findById(req.user._id);
        console.log("User found", user, addedItems);
        let isPresent = false;
        let quantity = 1;
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
