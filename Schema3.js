const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    username: { type: String, required: true },
    image: String,
    topic: String,
    description: String,
    price: String
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;

