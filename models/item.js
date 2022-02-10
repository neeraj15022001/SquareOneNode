const mongoose = require("mongoose");
const multer = require("multer")
const path = require("path")
const ITEM_PATH = "/uploads/items"
const itemSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    portion: {
        type: Number,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    foodStyle: {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", ITEM_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname.split(".")[0] + '-' + uniqueSuffix)
    }
})

//Static Methods

itemSchema.statics.uploadedItem = multer({storage: storage}).single('image');
itemSchema.statics.ITEMPATH = ITEM_PATH;
const Item = mongoose.model("items", itemSchema);
module.exports = Item;