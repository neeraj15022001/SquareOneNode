const fs = require("fs");
const path = require("path");
const Item = require("../models/item");
module.exports.create = async (req, res) => {
    try {
        Item.uploadedItem(req, res, async function (err) {
            if (err) {
                console.log("****MULTER ERROR****", err);
                return res.redirect("back");
            }
            try {
                let item = await Item.create({
                    ...req.body,
                    image: Item.ITEMPATH + "/" + req.file.filename
                })
            } catch (e) {
                console.log("Error while adding item to DB", e);
            }
            return res.redirect("back");
        });
    } catch (e) {
        return res.redirect("back");
    }
};
