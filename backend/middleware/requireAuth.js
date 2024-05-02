const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    //check authenticiyt
    console.log("running auth")
    console.log(req.headers)

    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error: "auth token required"})
    }
    const token = authorization.split(' ')[1]
    try{
        const { _id, email } = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id }).select('_id email');
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        console.log(req.user)
        next()
        
    } catch (error){
        console.log(error)
        res.status(401).json({error: "request not authorised"})
    }
}

module.exports = requireAuth