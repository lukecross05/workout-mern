const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
    res.json({mssg: 'test get all'})

})

module.exports = router