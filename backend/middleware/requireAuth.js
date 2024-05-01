const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    //check authenticiyt
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error: "auth token required"})
    }
    const token = authorization.split(' ')[1]
    console.log(token)
    try{
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()
        
    } catch (error){
        console.log(error)
        res.status(401).json({error: "request not autherised"})
    }
}

module.exports = requireAuth