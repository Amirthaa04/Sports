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


// const mongoose = require('mongoose')

// const CartSchema = new mongoose.Schema({
//     image: String,
//     topic:String,
//     description: String,
//     price: String
// });

// const Cart = mongoose.model("Cart", CartSchema);
// module.exports = Cart;

// Schema3.js (or your Cart schema file)
// const mongoose = require('mongoose');

// const CartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Register',
//         required: true
//     },
//     topic: String,
//     description: String,
//     price: String,
//     image: String
// });

// const Cart = mongoose.model('Cart', CartSchema);

// module.exports = Cart;

