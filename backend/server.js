require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
// Express app
const app = express();

app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log('Request Path: ', req.path);
  console.log('Request Method: ', req.method);
  res.on("finish", () => {
    console.log('Status Code: ', res.statusCode);
  });
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', profileRoutes);

// Connect to database
mongoose.connect(process.env.MONGO_URL).then(() => {
  // Listen for requests
  app.listen(process.env.PORT, () => {
    console.log('Connected to database and listening on port', process.env.PORT);
  });
}).catch((error) => {
  console.log(error);
});