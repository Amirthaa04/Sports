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
                "message":"Valid user",
                name:user.username,
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

// app.get('/req-questions', async function(request, response) {
//     try {
//         const { category } = request.query;
//         const questions = await Sports.find({ category });
//         response.status(200).json(questions);
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         response.status(500).json({
//             status: 'failure',
//             message: 'Failed to fetch questions',
//             error: error.message
//         });
//     }
// });
app.get('/req-questions', async function(request, response) {
    try {
        const { category, price } = request.query;
        let filter = { category };

        // Optional: Add filtering by price
        if (price) {
            switch (price) {
                case 'Under 500':
                    filter.price = { $lt: 500 };
                    break;
                case '500 to 1000':
                    filter.price = { $gte: 500, $lt: 1000 };
                    break;
                case '1000 to 2000':
                    filter.price = { $gte: 1000, $lt: 2000 };
                    break;
                case '2000 to 3000':
                    filter.price = { $gte: 2000, $lt: 3000 };
                    break;
                case '3000 to 4000':
                    filter.price = { $gte: 3000, $lt: 4000 };
                    break;
                case '4000 to 5000':
                    filter.price = { $gte: 4000, $lt: 5000 };
                    break;
                default:
                    break;
            }
        }

        const questions = await Sports.find(filter);
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
    const { username , image, topic, description, price } = req.body;

    const newCartItem = new Cart({username, image, topic, description, price });

    newCartItem.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getcart', async (req, res) => {

    try {
        const {username}=req.query;
        const carts = await Cart.find({username:username});
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

// Update quantity of a cart item
app.patch('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body; // Assuming you're sending the updated quantity in the request body

        // Validate if quantity is a positive integer
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be a positive integer' });
        }

        const updatedCartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });

        if (!updatedCartItem) {
            return res.status(404).json({ error: 'Item not found in the cart' });
        }

        res.status(200).json(updatedCartItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Assuming you have already defined your Cart model and imported necessary modules

// Route to get the count of cart items
app.get('/getcart/count', async (req, res) => {
    const userId = req.user.id; // Assuming you have user information stored in req.user after authentication

    try {
        const itemCount = await Cart.countDocuments({ userId });
        res.json({ count: itemCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = app;




