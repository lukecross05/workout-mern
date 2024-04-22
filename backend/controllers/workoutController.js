const mongoose = require('mongoose')

const Workout = require('../models/Workouts')

const createWorkout = async (req, res) => {
    const {title, reps, weight} = req.body
    try{
        const workout = await Workout.create({title, reps, weight})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'test post workout'})
}

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isvalid(id)){
        return res.status(404).json({error: 'no such workout'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
      }  
    res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isvalid(id)){
        return res.status(404).json({error: 'no such id'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
      }  
    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isvalid(id)){
        return res.status(404).json({error: 'no such id'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, req.body, { new: true })
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
      }  
    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}
  