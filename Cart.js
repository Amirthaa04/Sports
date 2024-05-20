const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Register' },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Sports' },
        quantity: { type: Number, default: 1 },
    }]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
