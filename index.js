const express = require('express');
const mongoose = require('mongoose');
const Cart = require('./Schema3.js'); // Assuming you saved the Cart schema in CartSchema.js
const bodyParser = require('body-parser');
const cors = require('cors');
const Sports = require('./Schema.js');
const Register = require('./Schema2.js');
const app = express();
app.use(bodyParser.json());
app.use(cors());



// Database connection
async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://Amirtha:Amirthaa@cluster0.yjyqtgf.mongodb.net/Sports?retryWrites=true&w=majority&appName=Cluster0');
        console.log('DB Connection established');
        const port = process.env.PORT || 8003;
        app.listen(port, function () {
            console.log(`Listening on port ${port}`);
        });
    } catch (error) {
        console.log("Couldn't establish connection");
        console.log(error);
    }
}

connectToDb();

app.post('/register', async function(request, response) {
    try {
        const newUser = await Register.create({
            email: request.body.email,
            username: request.body.username,
            password: request.body.password
        });
        response.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to create user',
            error: error.message
        });
    }
});
app.post('/login',async function(request,response){
    try{
        const {username,password}=request.body
        const user=await Register.findOne({username,password})

        if(user){
            response.status(200).json({
                "status":"success",
                "message":"Valid user"
            })
        }
        else{
            response.status(401).json({
                "status":"failure",
                "message":"Invalid user"
            })
        }
    }
    
    catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).json({
          status: 'failure',
          message: 'Failed to fetch users',
          error: error.message
        })
      }
})

app.post('/add-ques', async function(request, response) {
    try {
        const newUser = await Sports.create({
            topic: request.body.topic,
            description: request.body.description,
            image: request.body.image,
            price: request.body.price,
            category: request.body.category
        });
        response.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to create user',
            error: error.message
        });
    }
});

app.get('/req-questions', async function(request, response) {
    try {
        const { category } = request.query;
        const questions = await Sports.find({ category });
        response.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to fetch questions',
            error: error.message
        });
    }
});
app.post('/cart', (req, res) => {
    const { image, topic, description, price } = req.body;

    const newCartItem = new Cart({ image, topic, description, price });

    newCartItem.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getcart', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = app;

// Add new endpoint for retrieving cart items
// app.get('/cart', async function(request, response) {
//     try {
//         const { userId } = request.query;

//         if (!userId) {
//             return response.status(400).json({ error: 'User ID is required' });
//         }

//         const cart = await Cart.findOne({ userId }).populate('items.productId');

//         if (!cart) {
//             return response.status(200).json([]);
//         }

//         const populatedCartItems = cart.items.map(item => ({
//             productId: item.productId._id,
//             topic: item.productId.topic,
//             description: item.productId.description,
//             image: item.productId.image,
//             price: item.productId.price,
//             quantity: item.quantity,
//         }));

//         response.status(200).json(populatedCartItems);
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         response.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Add new endpoint for removing items from the cart
// app.post('/remove-from-cart', async function(request, response) {
//     try {
//         const { userId, productId } = request.body;

//         if (!userId || !productId) {
//             return response.status(400).json({ error: 'User ID and Product ID are required' });
//         }

//         const cart = await Cart.findOne({ userId });

//         if (!cart) {
//             return response.status(404).json({ error: 'Cart not found' });
//         }

//         cart.items = cart.items.filter(item => item.productId.toString() !== productId);

//         await cart.save();

//         response.status(200).json({ message: 'Item removed from cart successfully' });
//     } catch (error) {
//         console.error('Error removing item from cart:', error);
//         response.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.post('/add-to-cart', async function(request, response) {
//     try {
//         const { userId, productId } = request.body;

//         if (!userId || !productId) {
//             return response.status(400).json({ error: 'User ID and Product ID are required' });
//         }

//         // Find the user's cart
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             // If the cart doesn't exist, create a new one
//             cart = new Cart({ userId, items: [] });
//         }

//         // Check if the product is already in the cart
//         const cartItem = cart.items.find(item => item.productId.toString() === productId);

//         if (cartItem) {
//             // If the product is already in the cart, increase the quantity
//             cartItem.quantity += 1;
//         } else {
//             // If the product is not in the cart, add it
//             cart.items.push({ productId });
//         }

//         // Save the cart
//         await cart.save();

//         response.status(200).json({ message: 'Item added to cart successfully' });
//     } catch (error) {
//         console.error('Error adding item to cart:', error);
//         response.status(500).json({ error: 'Internal server error' });
//     }
// });

