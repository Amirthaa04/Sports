const mongoose = require('mongoose')
const express = require('express')
const Sports = require('./Schema.js')
const bodyParser = require('body-parser')
// const cors = require('cors')

const app = express()
app.use(bodyParser.json())
// app.use(cors())


async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://Amirtha:Amirthaa@cluster0.yjyqtgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB Connection established')
        const port = process.env.PORT || 8002 // in cloud service take any port no which is avaliable(process.env.PORT) , in local machine it will take 8002 as port number
        app.listen(port, function () {
            console.log(`Listening on port ${port} `)
        })
    } catch (error) {
        console.log(error)
        console.log("Couldn't establish connection")
    }
}

connectToDb()


app.post('/add-ques', async function(request, response) {
    try {
      const newUser = await Sports.create({
        topic: request.body.topic,
        description: request.body.description,
        image: request.body.image,
        price: request.body.price,
        category: request.body.category
      })
      response.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user: newUser
      })
    } catch (error) {
      console.error('Error creating user:', error)
      response.status(500).json({
        status: 'failure',
        message: 'Failed to create user',
        error: error.message
      })
    }
  })

  app.get('/req-questions', async function (request, response) {
    try {
        const { category } = request.query;
        // Assuming you have a schema named 'Question' for storing questions
        const questions = await Question.find({ category }); // Find questions based on difficulty
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


