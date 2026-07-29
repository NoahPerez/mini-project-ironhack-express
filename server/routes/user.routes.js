import express from 'express'
import User from '../models/user.models.js'
import isAuth from '../middleware/jwt.middleware.js'


const router = express.Router()

router.get("/users/:id", isAuth, async(req,res,next)=>{
    try{

//means:

// - find the user by Mongo _id
// - but do not include the password field in the returned result
// Why .select("-password")

// - In Mongo/Mongoose, .select() lets you choose which fields to include or exclude
// - A minus sign means “exclude this field”
        const user = await User.findById(req.params.id).select("-password")
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        res.json(user)
    }catch(err){
        next(err)
    }
})

export default router