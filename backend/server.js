//This code  requires the dotenv, which grants access to our .env file.
require('dotenv').config()
/*
    Here, we import the Express.js module and create an Express application instance using express(). 
    The app variable is an instance of the Express application, 
    which we'll use to define routes, middleware, and start the server.
    we also require MongoClient to use our db.
*/
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')
/*
    this is a middleware function, which can be used for many things,
    usual flow is, request comes from frontend to middleware 
    which passes it onto route handler to decide what to do.
    middleware can be used for a lot of things like authentication, here were just logging.
*/
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
/*
    Defines a variable which gets the code from our routes file.
    Then we set up middleware to handle requests from this url with workoutRoutes.
*/
const workoutRoutes = require('./routes/workouts')
app.use('/api/workouts/', workoutRoutes)
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
/*
    code from mongo db, uesd to set up connection to the db from server.
*/
const client = new MongoClient(process.env.MONGO_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
run().catch(console.dir);
/*
    This middleware function catches any errors
    that occur during the request processing pipeline.
*/
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
}) 
/*
    This code starts the server and listens for incoming requests on port 4000. 
    When the server starts successfully, the callback function passed to app.listen(),
    meaning the message will be logged.
*/
app.listen(process.env.PORT, () => {
    console.log('testing')
})




