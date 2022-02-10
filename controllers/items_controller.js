const fs = require("fs");
const path = require("path");
const Item = require("../models/item")
module.exports.create = async (req, res) => {
    console.log(req)
    try {
        Item.uploadItem(req, res, function (err) {
            console.log(req.file)
        })
    } catch (e) {
        return res.redirect("back");
    }
}