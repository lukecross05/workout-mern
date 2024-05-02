const express = require('express')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const { createUserProfile, getUserProfile} = require('../controllers/profileController')

router.use(requireAuth)

router.post('/profile', createUserProfile)

router.get('/profile', getUserProfile);

module.exports = router