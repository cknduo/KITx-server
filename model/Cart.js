require ('./db')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema ({
        userID: String,
        cartItems: [String]
})

module.exports = mongoose.model ('Cart', cartSchema, 'carts')
