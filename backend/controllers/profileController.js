const Profile = require('../models/profileModel')


const createUserProfile = async (req, res) => {

    
    
    const email = req.user.email;

    console.log(email)

    const { username, bio } = req.body

    try{
        const profile = await Profile.createProfile(email, username, bio ? bio : undefined)
        res.status(201).json(profile)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUserProfile = async (req, res) => {

    const userEmail = req.user.email
    
    try {
        const existingProfile = await Profile.findOne({ email: userEmail });

        if (!existingProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        const profile = existingProfile;

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createUserProfile, getUserProfile }