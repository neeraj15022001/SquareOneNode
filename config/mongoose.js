const mongoose = require("mongoose");
const db = main().then(res => {
    // console.log(res);
    return db
}).catch(err => console.log(err));

// console.log(db)

async function main() {
    return await mongoose.connect('mongodb://localhost:27017/squareOne');
}

db.then(res => {
    module.exports = res;
}).catch((err) => {
    module.exports = err;
})