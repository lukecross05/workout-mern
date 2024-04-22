const express = require('express')
const { 
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const router = express.Router()
/*
    when a request is called to '/' this handler is called.
*/
router.get('/', async (req, res) => getWorkouts)
/*
    when a request is called to '/:id' this handler is called.
    id is a param of route.
*/
router.get('/:id', async (req, res) => getWorkout)
/*
    when a post request is sent to default url, an async function is called.
    it tries to make a variable named workout from the request, if not returns error.
*/
router.post('/', async (req, res) => createWorkout)

router.delete('/:id', (req, res) => deleteWorkout)

router.patch('/:id', (req, res) => updateWorkout)


module.exports = router