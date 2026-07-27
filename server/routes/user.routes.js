import express from 'express'
import User from '../models/user.models.js'
import isAuth from '../middleware/jwt.middleware.js'


const router = express.Router()

router.get("/users/:id", isAuth, async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        res.json(user)
    }catch(err){
        next(err)
    }
})

export default router