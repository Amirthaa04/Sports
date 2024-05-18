const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cart = require('./Schema3.js'); // Assuming you saved the Cart schema in CartSchema.js
const bodyParser = require('body-parser');
const cors = require('cors');
const Sports = require('./Schema.js');
const Register = require('./Schema2.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

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

// app.post('/register', async function(request, response) {
//     try {
//         const newUser = await Register.create({
//             email: request.body.email,
//             username: request.body.username,
//             password: request.body.password
//         });
//         response.status(201).json({
//             status: 'success',
//             message: 'User created successfully',
//             user: newUser
//         });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         response.status(500).json({
//             status: 'failure',
//             message: 'Failed to create user',
//             error: error.message
//         });
//     }
// });

app.post('/register', async function(request, response) {
    try {
      const { email, username, password } = request.body;
      const newUser = await Register.create({ email, username, password });
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
  
  // Login route
  app.post('/login', async function(request, response) {
    try {
      const { email, password } = request.body;
      const user = await Register.findOne({ email });
  
      if (!user) {
        return response.status(401).json({
          status: 'failure',
          message: 'Invalid email or password'
        });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return response.status(401).json({
          status: 'failure',
          message: 'Invalid email or password'
        });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      response.status(200).json({
        status: 'success',
        message: 'Login successful',
        token
      });
    } catch (error) {
      console.error('Error logging in:', error);
      response.status(500).json({
        status: 'failure',
        message: 'Failed to login',
        error: error.message
      });
    }
  });

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

// Add to cart route
app.post('/add-to-cart', async function(request, response) {
    try {
        const { userId, productId } = request.body;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Cart exists for the user
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                cart.items[itemIndex].quantity += 1;
            } else {
                // Product does not exist in the cart, add new item
                cart.items.push({ productId, quantity: 1 });
            }
        } else {
            // No cart for the user, create a new cart
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        }

        await cart.save();
        response.status(200).json({
            status: 'success',
            message: 'Item added to cart successfully',
            cart
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to add item to cart',
            error: error.message
        });
    }
});

// Get cart items route
app.get('/cart', async function(request, response) {
    try {
        const { userId } = request.query;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return response.status(200).json({
                status: 'success',
                message: 'No items in cart',
                items: []
            });
        }

        response.status(200).json({
            status: 'success',
            message: 'Cart items fetched successfully',
            items: cart.items
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to fetch cart items',
            error: error.message
        });
    }
});

module.exports = app;
