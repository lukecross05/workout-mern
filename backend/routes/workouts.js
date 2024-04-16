const express = require('express')
const router = express.Router()
/*
    when a request is called to '/' this handler is called.
*/
router.get('/', (req, res) => {
    res.json({mssg: 'test get all'})
})
/*
    when a request is called to '/:id' this handler is called.
    id is a param of route.
*/
router.get('/:id', (req, res) => {
    res.json({mssg: 'test get single'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'test post workout'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'test delete workout'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'test update workout'})
})


module.exports = router