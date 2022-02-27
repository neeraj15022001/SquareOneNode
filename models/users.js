const mongoose = require("mongoose");
const {number} = require("tailwindcss/lib/util/dataTypes");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartItems: [{
        item: {type: mongoose.Schema.Types.ObjectId, ref: "items"},
        quantity: mongoose.Schema.Types.Number
    }],
    totalCartValue: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    totalCartItems: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
}, {
    timestamps: true
})

const Users = mongoose.model('Users', userSchema);
module.exports = Users;