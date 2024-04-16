//This code  requires the dotenv, which grants access to our .env file.
require('dotenv').config()
/*
    Here, we import the Express.js module and create an Express application instance using express(). 
    The app variable is an instance of the Express application, 
    which we'll use to define routes, middleware, and start the server.
*/
const express = require('express')
const app = express()
/*
    Also, defines a variable which gets the code from our routes file.
    Then we set up middleware to handle requests from the url with workoutRoutes.
*/
const workoutRoutes = require('./routes/workouts')
app.use('/api/workouts/', workoutRoutes)
/*
    This code starts the server and listens for incoming requests on port 4000. 
    When the server starts successfully, the callback function passed to app.listen(),
    meaning the message will be logged.
*/
app.listen(process.env.PORT, () => {
    console.log('testing')
})
/*
    This code defines a route for the root URL '/' using app.get(). 
    When a GET request is made to the root URL, the callback function (req, res) is executed. 
    Basically, when we get a 'GET' req from 'http://localhost:4000/', this function is called.
    In the function, the object in the {} is passed to .json() which is sent to the res body.
    Mssg is the key associated with the string.
*/
app.get('/', (req, res) => {
    res.json({mssg: 'welcome to the app'})
})
