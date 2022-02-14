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
    cartItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart"
        }

    ]
}, {
    timestamps: true
})

const Users = mongoose.model('Users', userSchema);
module.exports = Users;